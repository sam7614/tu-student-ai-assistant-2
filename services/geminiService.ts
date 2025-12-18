import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AcademicRecommendations } from "../types";

// Static context to help the AI understand the "university" environment
const UNIVERSITY_CONTEXT = `
You are an academic advisor AI for a university. 
Your goal is to recommend the best curriculum path based on the student's profile (Major, Interests, Aptitude).

Academic Structure:
1. Micro-degree (MD): Small thematic module (9~15 credits).
2. Double Major (복수전공): Requires approx. 36 credits. Often achieved by combining 2-3 related modules or taking a full major track from another department.
3. Minor (부전공): Requires approx. 24 credits. Less than a double major but allows specialization.

Available Modules (examples):
- AI Convergence Business (Business + CS)
- Big Data Analysis Basics (Industrial Engineering)
- Smart Factory Operation (Mechanical + Industrial + CS)
- Digital Marketing (Business)
- Web Full Stack Development (CS)
- AI Deep Learning (CS)
- Cultural Content Technology (Content + CS)
- Financial/Accounting Expert (Business)
- Global Logistics (Logistics)
- UX/UI Design (Design)
- Child Psychology Care (Early Childhood Education)
- Future Edu-Tech (Early Childhood Education)

When recommending a Double Major or Minor, suggest a title that reflects the combination of modules or the specific field (e.g., "AI Business Data Double Major" combining "AI MD" + "Business MD").
`;

export const getModuleRecommendations = async (profile: UserProfile): Promise<AcademicRecommendations> => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const prompt = `
        Student Profile:
        - Current Major: ${profile.major}
        - Interests: ${profile.interests}
        - Aptitude/Career Goals: ${profile.aptitude}

        Based on this profile, provide recommendations in JSON format with three categories:
        1. microDegrees: Recommend 2 specific Micro-degrees (MD).
        2. doubleMajors: Recommend 1 Double Major path (approx 36 credits). Explain which modules to combine.
        3. minors: Recommend 1 Minor path (approx 24 credits).

        For each item, provide:
        - title: Name of the MD, Major, or Minor.
        - dept: Department or composition (e.g., "CS + Business").
        - reason: Why this fits the student.
        - matchType: "Strong" or "Normal".
        - tags: 2-3 keywords (e.g., "AI", "Data", "Creative").
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: UNIVERSITY_CONTEXT,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        microDegrees: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    dept: { type: Type.STRING },
                                    reason: { type: Type.STRING },
                                    matchType: { type: Type.STRING, enum: ["Strong", "Normal"] },
                                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                                }
                            }
                        },
                        doubleMajors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    dept: { type: Type.STRING },
                                    reason: { type: Type.STRING },
                                    matchType: { type: Type.STRING, enum: ["Strong", "Normal"] },
                                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                                }
                            }
                        },
                        minors: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    dept: { type: Type.STRING },
                                    reason: { type: Type.STRING },
                                    matchType: { type: Type.STRING, enum: ["Strong", "Normal"] },
                                    tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                                }
                            }
                        }
                    }
                }
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        return JSON.parse(text) as AcademicRecommendations;

    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback for demo
        return {
            microDegrees: [
                {
                    title: "AI 융합 비즈니스 MD",
                    dept: "경영학과 + 컴퓨터공학과",
                    reason: "비즈니스 도메인 지식과 AI 기술을 결합하여 실무적인 문제 해결 능력을 키울 수 있습니다. (Demo Data)",
                    matchType: "Strong",
                    tags: ["AI", "비즈니스"]
                },
                {
                    title: "빅데이터 분석 기초 MD",
                    dept: "산업공학과 주관",
                    reason: "데이터 전처리부터 시각화까지 핵심 역량을 빠르게 습득할 수 있습니다. (Demo Data)",
                    matchType: "Normal",
                    tags: ["데이터", "분석"]
                }
            ],
            doubleMajors: [
                {
                    title: "AI 서비스 경영 복수전공",
                    dept: "AI학부 + 경영학과",
                    reason: "'AI 서비스 개발자 MD'와 '디지털 마케팅 MD'를 결합하여 기술 기반의 창업 또는 PM 역량을 완성합니다.",
                    matchType: "Strong",
                    tags: ["기술경영", "창업"]
                }
            ],
            minors: [
                {
                    title: "데이터 사이언스 부전공",
                    dept: "데이터사이언스학과",
                    reason: "핵심 데이터 분석 교과목 24학점을 이수하여 전공 분야의 데이터 활용 능력을 입증합니다.",
                    matchType: "Normal",
                    tags: ["통계", "R/Python"]
                }
            ]
        };
    }
};

// Helper function to suggest a track name based on subjects
export const suggestTrackName = async (subjects: string[]): Promise<string> => {
     if (subjects.length === 0) return "새로운 설계 모듈";

     try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
        Given the following list of university subjects: ${subjects.join(', ')}.
        Suggest a short, professional name (max 5 words) for a learning module or micro-degree that contains these subjects.
        Return only the name.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return response.text?.trim() || "융합 설계 모듈";
     } catch (e) {
         return "융합 설계 모듈";
     }
}
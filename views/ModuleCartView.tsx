
import React, { useState } from 'react';
import { XIcon } from '../components/Icons';

interface CartItem {
    id: string;
    title: string;
    credits: number;
    date: string;
    description?: string;
}

// --- Detail Interfaces & Mock Data Helpers ---

interface InterviewData {
    id: string;
    studentName: string;
    studentId: string;
    companyName: string;
    companyRole: string;
    location: string;
    industry: string;
    product: string;
    jobDuty: string;
    question: string;
    answer: string;
    avatarChar: string;
    avatarColor: string;
}

interface ModuleDetail extends CartItem {
    industryTrend: string;
    hiringPlan: string;
    reason: string;
    subjects: string[];
    interviews: InterviewData[];
}

interface WeeklyPlanItem {
    week: number;
    topic: string;
    objectives: string;
    materials: string;
}

interface SubjectProfile {
    name: string;
    overview: string;
    objectives: string[];
    competencies: string[];
    methods: string[];
    weeklyPlan: WeeklyPlanItem[];
}

const SUBJECT_PROFILES: Record<string, SubjectProfile> = {
    '머신러닝': {
        name: '머신러닝',
        overview: '인공지능의 핵심 분야인 머신러닝의 기본 개념과 알고리즘을 학습하고, 파이썬 라이브러리를 활용하여 실제 데이터를 분석하고 예측 모델을 구현합니다.',
        objectives: ['머신러닝 알고리즘 이해', '데이터 전처리 및 모델링', '성능 평가 및 최적화'],
        competencies: ['데이터 분석', '알고리즘 구현'],
        methods: ['강의', '실습', '프로젝트'],
        weeklyPlan: Array.from({length: 15}, (_, i) => ({ week: i + 1, topic: `주차별 학습 주제 ${i+1}`, objectives: '핵심 역량 습득', materials: '강의자료' }))
    }
};

const generateDetail = (item: CartItem): ModuleDetail => {
    let subjects = ['전공 기초', '심화 응용', '캡스톤 디자인', '실무 프로젝트'];
    if (item.title.includes('AI')) subjects = ['파이썬프로그래밍', '머신러닝', '딥러닝', 'AI프로젝트'];
    else if (item.title.includes('경영')) subjects = ['경영학원론', '마케팅', '데이터분석', '비즈니스전략'];
    else if (item.title.includes('스마트')) subjects = ['IoT개론', '임베디드', '스마트팩토리', '공정제어'];

    return {
        ...item,
        industryTrend: `${item.title} 관련 분야는 디지털 전환과 함께 급성장하고 있으며, 전문성을 갖춘 실무 인재 수요가 매우 높습니다.`,
        hiringPlan: '관련 대기업 및 혁신 스타트업에서 직무 역량 중심의 수시 채용이 확대되고 있습니다.',
        reason: '이론과 실무를 겸비한 커리큘럼으로, 포트폴리오를 완성하여 취업 경쟁력을 확보할 수 있습니다.',
        subjects: subjects,
        interviews: [
            {
                id: 'int1', studentName: '김선배', studentId: '2020 졸업', companyName: '선도기업 Tech', companyRole: '엔지니어',
                location: '서울', industry: 'IT/제조', product: '핵심 솔루션', jobDuty: '관련 기술 개발 및 운영',
                question: '이 모듈의 장점은?', answer: '"실무와 유사한 프로젝트 경험을 쌓을 수 있어서 취업 준비에 큰 도움이 되었습니다."',
                avatarChar: '🧑‍💻', avatarColor: 'bg-blue-100'
            }
        ]
    };
};

type TabType = 'saved' | 'self_module' | 'double' | 'minor' | 'self_major';

const ModuleCartView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('saved');
    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<SubjectProfile | null>(null);
    const [selectedInterview, setSelectedInterview] = useState<InterviewData | null>(null);

    // Mock Data for each category
    const [items, setItems] = useState<Record<TabType, CartItem[]>>({
        saved: [
            { id: 's1', title: 'AI 서비스 개발자 MD', credits: 12, date: '2024.03.15', description: 'AI학부 주관' },
            { id: 's2', title: '빅데이터 경영 MD', credits: 15, date: '2024.04.02', description: '경영학과 주관' },
            { id: 's3', title: '스마트 팩토리 운영 MD', credits: 12, date: '2024.05.20', description: '기계공학부 주관' }
        ],
        self_module: [
            { id: 'sm1', title: '나의 AI 기초 설계', credits: 9, date: '2024.03.10', description: '파이썬 및 기초 수학 중심' },
            { id: 'sm2', title: '웹 프론트엔드 집중', credits: 12, date: '2024.06.01', description: 'React 및 UI/UX 디자인' }
        ],
        double: [
            { id: 'd1', title: 'AI-경영 복수전공', credits: 36, date: '2024.01.20', description: 'AI학부 + 경영학과 융합' }
        ],
        minor: [
            { id: 'm1', title: '데이터 사이언스 부전공', credits: 24, date: '2024.02.15', description: '데이터 분석 핵심 역량' }
        ],
        self_major: [
            { id: 'mj1', title: '에듀테크 콘텐츠 전공', credits: 42, date: '2024.05.05', description: '유아교육 + 컴공 + 디자인 융합 설계' }
        ]
    });

    const handleDelete = (id: string) => {
        if (confirm('선택한 항목을 보관함에서 삭제하시겠습니까?')) {
            setItems(prev => ({
                ...prev,
                [activeTab]: prev[activeTab].filter(item => item.id !== id)
            }));
        }
    };

    const handleApply = (title: string) => {
        if (window.confirm(`'${title}' 과정을 수강 신청하시겠습니까?`)) {
            alert(`[${title}] 신청이 완료되었습니다.\n나의 학습 이력 및 수강 신청 내역에서 확인하실 수 있습니다.`);
        }
    };

    const handleDetailClick = (item: CartItem) => {
        setSelectedModule(generateDetail(item));
    };

    const handleSubjectClick = (subjectName: string) => {
        const profile = SUBJECT_PROFILES[subjectName] || {
            name: subjectName,
            overview: `${subjectName} 교과목 개요입니다.`,
            objectives: ['핵심 목표 1', '핵심 목표 2'],
            competencies: ['전공 역량'],
            methods: ['강의'],
            weeklyPlan: []
        };
        setSelectedSubject(profile);
    };

    const tabs: { id: TabType; label: string }[] = [
        { id: 'saved', label: '담아둔 모듈' },
        { id: 'self_module', label: '자기설계 모듈' },
        { id: 'double', label: '복수전공' },
        { id: 'minor', label: '부전공' },
        { id: 'self_major', label: '자기설계 전공' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <h2 className="text-3xl font-bold mb-1">나의 모듈/전공 보관함</h2>
                    <p className="text-gray-600">설계하거나 담아둔 다양한 교육과정을 관리하는 공간입니다.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px] flex flex-col">
                {/* Tabs */}
                <div className="flex border-b overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 text-sm font-bold transition-colors whitespace-nowrap focus:outline-none ${
                                activeTab === tab.id
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                            <span className="ml-2 text-xs font-normal bg-gray-100 px-1.5 py-0.5 rounded-full text-gray-500">
                                {items[tab.id].length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* List Content */}
                <div className="p-6 bg-gray-50 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items[activeTab].map((item) => (
                            <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded">
                                        {tabs.find(t => t.id === activeTab)?.label}
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-gray-300 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                                        title="삭제"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.description}</p>
                                
                                <div className="mt-auto pt-3 border-t flex justify-between items-center text-sm mb-3">
                                    <span className="text-gray-400 text-xs">{item.date} 저장</span>
                                    <span className="font-bold text-gray-800">{item.credits} <span className="font-normal text-xs text-gray-500">학점</span></span>
                                </div>
                                
                                <button 
                                    onClick={() => handleDetailClick(item)}
                                    className="w-full py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200"
                                >
                                    상세보기
                                </button>

                                <button 
                                    onClick={() => handleApply(item.title)}
                                    className="mt-2 w-full py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors shadow-sm"
                                >
                                    신청하기
                                </button>
                            </div>
                        ))}
                        
                        {items[activeTab].length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                                <svg className="w-12 h-12 mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p>보관된 항목이 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Level 1: Module Detail Modal */}
            {selectedModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                            <div>
                                <span className="text-xs font-bold text-gray-500 block mb-1">{selectedModule.date} 저장됨</span>
                                <h3 className="text-xl font-bold text-gray-900">{selectedModule.title}</h3>
                            </div>
                            <button 
                                onClick={() => setSelectedModule(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="p-6 bg-gray-50 flex-1">
                            <div className="space-y-6">
                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <div className="mb-6">
                                        <h5 className="font-bold text-lg text-gray-900 mb-2">모듈 소개</h5>
                                        <p className="text-gray-700 leading-relaxed">{selectedModule.description}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                                        <div className="space-y-2">
                                            <span className="font-bold text-blue-600">📈 산업 동향 분석</span>
                                            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100">{selectedModule.industryTrend}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="font-bold text-green-600">💼 채용 계획 및 전망</span>
                                            <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100">{selectedModule.hiringPlan}</p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t mt-3">
                                        <span className="text-xs font-bold text-gray-500 block mb-2 uppercase">구성 교과목</span>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedModule.subjects.map((sub, i) => (
                                                <button key={i} onClick={() => handleSubjectClick(sub)} className="text-xs font-medium bg-gray-100 text-blue-700 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-blue-100 transition-colors">
                                                    {sub}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {selectedModule.interviews.length > 0 && (
                                    <div className="bg-white border rounded-xl p-6 shadow-sm">
                                        <h5 className="font-bold text-lg text-gray-900 mb-4">🎓 졸업생 취업 현황</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedModule.interviews.map(interview => (
                                                <div key={interview.id} onClick={() => setSelectedInterview(interview)} className="border rounded-lg p-4 hover:shadow-md cursor-pointer flex items-center gap-3 bg-white">
                                                    <div className={`w-10 h-10 rounded-full ${interview.avatarColor} flex items-center justify-center text-xl`}>{interview.avatarChar}</div>
                                                    <div>
                                                        <div className="font-bold text-sm">{interview.studentName} <span className="text-xs font-normal text-gray-500">{interview.companyName}</span></div>
                                                        <div className="text-xs text-gray-500 line-clamp-1">{interview.answer}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Level 2: Subject Profile Modal */}
            {selectedSubject && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                     <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative flex flex-col">
                        <div className="sticky top-0 bg-blue-600 px-6 py-4 flex justify-between items-center z-10 text-white">
                            <h3 className="text-xl font-bold">📖 {selectedSubject.name}</h3>
                            <button onClick={() => setSelectedSubject(null)} className="p-2 hover:bg-blue-700 rounded-full"><XIcon className="w-6 h-6" /></button>
                        </div>
                        <div className="p-6 space-y-6">
                            <p className="text-gray-800 bg-gray-50 p-4 rounded-lg border border-gray-100">{selectedSubject.overview}</p>
                            <div>
                                <h4 className="font-bold text-blue-600 mb-2">학습 목표</h4>
                                <ul className="list-disc list-inside text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
                                    {selectedSubject.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                </ul>
                            </div>
                        </div>
                     </div>
                </div>
            )}

            {/* Level 2: Interview Detail Modal */}
            {selectedInterview && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative flex flex-col">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                            <h3 className="text-xl font-bold">🎙️ 인터뷰 상세</h3>
                            <button onClick={() => setSelectedInterview(null)} className="p-2 hover:bg-gray-100 rounded-full"><XIcon className="w-6 h-6" /></button>
                        </div>
                        <div className="p-8 bg-gray-50 flex flex-col md:flex-row gap-8">
                            <div className="w-full md:w-1/3 bg-white p-6 rounded-xl border shadow-sm text-center">
                                <div className={`w-24 h-24 rounded-full ${selectedInterview.avatarColor} mx-auto mb-4 flex items-center justify-center text-5xl`}>{selectedInterview.avatarChar}</div>
                                <h4 className="font-bold text-xl">{selectedInterview.studentName}</h4>
                                <p className="text-sm text-gray-500">{selectedInterview.companyName} / {selectedInterview.companyRole}</p>
                            </div>
                            <div className="w-full md:w-2/3 bg-white p-6 rounded-xl border shadow-sm">
                                <h5 className="font-bold text-lg text-orange-900 mb-2">Q. {selectedInterview.question}</h5>
                                <p className="text-gray-700 italic text-lg leading-relaxed">"{selectedInterview.answer}"</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModuleCartView;

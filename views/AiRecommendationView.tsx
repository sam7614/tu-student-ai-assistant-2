import React, { useState } from 'react';
import { getModuleRecommendations } from '../services/geminiService';
import { UserProfile, AcademicRecommendations, RecommendationItem } from '../types';

const RecommendationCard: React.FC<{ item: RecommendationItem, typeLabel: string }> = ({ item, typeLabel }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow ${item.matchType === 'Strong' ? 'border-purple-500' : 'border-blue-500'}`}>
        <div className="flex justify-between items-start mb-2">
            <div>
                <div className="flex gap-2 mb-2">
                    <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-medium">
                        {typeLabel}
                    </span>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${item.matchType === 'Strong' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {item.matchType === 'Strong' ? '강력 추천' : '추천'}
                    </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
            </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">{item.dept}</p>
        
        {item.tags && (
            <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-50 text-gray-500 border border-gray-100 px-1.5 py-0.5 rounded">#{tag}</span>
                ))}
            </div>
        )}

        <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-4">
            <p className="font-semibold mb-1">💡 추천 이유:</p>
            <p className="text-gray-600 leading-relaxed">{item.reason}</p>
        </div>
        <button className={`w-full py-2 border rounded transition-colors text-sm font-medium ${item.matchType === 'Strong' ? 'border-purple-500 text-purple-600 hover:bg-purple-50' : 'border-blue-500 text-blue-600 hover:bg-blue-50'}`}>
            교육과정 담기
        </button>
    </div>
);

const AiRecommendationView: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        major: '',
        interests: '',
        aptitude: ''
    });
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<AcademicRecommendations | null>(null);

    const handleAnalyze = async () => {
        if (!profile.major) {
            alert('전공을 입력해주세요.');
            return;
        }
        setLoading(true);
        const recommendations = await getModuleRecommendations(profile);
        setResults(recommendations);
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold mb-1">AI 맞춤 학습 설계</h2>
            <p className="text-gray-600">나의 특성을 분석하여 마이크로디그리, 복수전공, 부전공을 추천받으세요.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">소속 학과 (전공)</label>
                        <input 
                            type="text" 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="예: 컴퓨터공학과, 유아교육과, 경영학과"
                            value={profile.major}
                            onChange={(e) => setProfile(p => ({ ...p, major: e.target.value }))}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">흥미 / 관심 분야</label>
                        <textarea 
                            rows={3} 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="예: 인공지능 기술을 활용한 교육 콘텐츠 개발, 핀테크 서비스 기획..."
                            value={profile.interests}
                            onChange={(e) => setProfile(p => ({ ...p, interests: e.target.value }))}
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">적성 / 진로 희망</label>
                        <textarea 
                            rows={3} 
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="예: 논리적인 문제 해결을 좋아함. 에듀테크 기업 PM 희망."
                            value={profile.aptitude}
                            onChange={(e) => setProfile(p => ({ ...p, aptitude: e.target.value }))}
                        ></textarea>
                    </div>
                    <button 
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                학생 프로파일 분석 및 교육과정 매칭 중...
                            </>
                        ) : (
                            <span>AI 추천 분석 시작하기</span>
                        )}
                    </button>
                </div>
            </div>

            {results && (
                <div className="space-y-8 animate-fade-in pb-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">🎯 AI 분석 결과 리포트</h3>
                        <span className="text-sm text-gray-500">Based on Gemini 2.5 Analysis</span>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm">
                        <strong>분석 요약:</strong> <span className="font-bold">{profile.major}</span> 전공을 기반으로 학생의 흥미({profile.interests.substring(0, 20)}...)와 진로 적성을 고려하여 다전공(복수/부전공) 및 모듈을 제안합니다.
                    </div>

                    {/* 1. Micro-degrees */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                            추천 마이크로디그리 (MD)
                            <span className="text-xs font-normal text-gray-500 ml-2">단기 직무 역량 집중 과정 (9~15학점)</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {results.microDegrees.map((item, idx) => (
                                <RecommendationCard key={`md-${idx}`} item={item} typeLabel="마이크로디그리" />
                            ))}
                        </div>
                    </section>

                    {/* 2. Double Major */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                            추천 복수전공 (Double Major)
                            <span className="text-xs font-normal text-gray-500 ml-2">전문성 확장 (약 36학점, 모듈 조합형)</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-6">
                            {results.doubleMajors.map((item, idx) => (
                                <RecommendationCard key={`dm-${idx}`} item={item} typeLabel="복수전공" />
                            ))}
                        </div>
                    </section>

                    {/* 3. Minor */}
                    <section>
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                            추천 부전공 (Minor)
                            <span className="text-xs font-normal text-gray-500 ml-2">융합 역량 함양 (약 24학점)</span>
                        </h4>
                        <div className="grid grid-cols-1 gap-6">
                            {results.minors.map((item, idx) => (
                                <RecommendationCard key={`mn-${idx}`} item={item} typeLabel="부전공" />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default AiRecommendationView;
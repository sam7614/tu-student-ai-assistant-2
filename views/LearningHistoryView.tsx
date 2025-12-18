
import React, { useState } from 'react';
import { ChevronDown, XIcon } from '../components/Icons';

interface ModuleDetail {
    title: string;
    description: string;
    industryTrend: string;
    hiringPlan: string;
    subjects: string[];
}

const LearningHistoryView: React.FC = () => {
    // State to track which semesters are expanded
    // Default: Current (2025-1) and Upcoming (2025-2) are open
    const [expandedSemesters, setExpandedSemesters] = useState<Record<string, boolean>>({
        '2025-1': true,
        '2025-2': true,
        '2024-2': false,
        '2024-1': false,
        '2023-2': false,
        '2023-1': false,
    });

    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);

    const toggleSemester = (semesterId: string) => {
        setExpandedSemesters(prev => ({
            ...prev,
            [semesterId]: !prev[semesterId]
        }));
    };

    const handleModuleClick = (moduleName: string) => {
        if (!moduleName || moduleName === '-' || moduleName === '기초 교양' || moduleName === '비교과') return;

        let detail: ModuleDetail = {
            title: moduleName,
            description: `${moduleName}은(는) 해당 분야의 전문 지식과 실무 역량을 함양하기 위해 체계적으로 설계된 교육과정입니다.`,
            industryTrend: '디지털 전환 가속화에 따라 관련 분야의 전문 인력 수요가 지속적으로 증가하고 있습니다.',
            hiringPlan: '주요 대기업 및 혁신 스타트업에서 직무 역량 중심의 채용을 확대하고 있습니다.',
            subjects: ['전공 기초', '심화 응용', '프로젝트', '캡스톤디자인']
        };

        if (moduleName.includes('AI 서비스') || moduleName.includes('AI-SW')) {
            detail = {
                title: moduleName,
                description: '인공지능 핵심 알고리즘 이해와 응용 소프트웨어 개발 능력을 갖춘 AI 전문 인재 양성 과정입니다.',
                industryTrend: '생성형 AI 시장의 폭발적 성장으로 AI 모델링 및 서비스 개발자 구인난이 심화되고 있습니다.',
                hiringPlan: '네이버, 카카오 등 IT 기업뿐만 아니라 금융, 제조 등 전 산업 분야에서 AI 개발자를 우대 채용 중입니다.',
                subjects: ['머신러닝', '딥러닝', 'AI프로젝트', '파이썬프로그래밍', '자료구조', '알고리즘']
            };
        } else if (moduleName.includes('웹 풀스택')) {
            detail = {
                title: moduleName,
                description: '프론트엔드와 백엔드 기술을 모두 다루며, 클라우드 환경에서의 웹 서비스 배포 및 운영 능력을 기릅니다.',
                industryTrend: '클라우드 네이티브 환경 확산으로 풀스택 개발 및 DevOps 역량을 갖춘 개발자 수요가 높습니다.',
                hiringPlan: '웹 서비스 기업 및 SI 업체에서 실무 투입 가능한 풀스택 개발자 채용이 활발합니다.',
                subjects: ['웹프로그래밍', '클라우드컴퓨팅', '네트워크', '데이터베이스', '서버구축']
            };
        } else if (moduleName.includes('핀테크') || moduleName.includes('빅데이터')) {
            detail = {
                title: moduleName,
                description: '데이터 분석 능력과 금융/비즈니스 도메인 지식을 융합하여 새로운 가치를 창출하는 전문가를 양성합니다.',
                industryTrend: '금융 산업의 디지털 혁신과 데이터 3법 시행으로 데이터 분석 및 핀테크 전문가 중요성이 증대되었습니다.',
                hiringPlan: '금융권(은행, 카드, 증권) 및 핀테크 기업에서 디지털 직군 채용 규모를 늘리고 있습니다.',
                subjects: ['데이터베이스', '정보보안', '경영학원론', '데이터분석', '블록체인']
            };
        }

        setSelectedModule(detail);
    };

    const ModuleLink = ({ name, className }: { name: string, className?: string }) => {
        const isClickable = name !== '기초 교양' && name !== '비교과' && name !== '-';
        return isClickable ? (
            <button 
                onClick={() => handleModuleClick(name)} 
                className={`hover:underline text-left font-medium focus:outline-none ${className}`}
            >
                {name}
            </button>
        ) : (
            <span className={`text-gray-500 ${className}`}>{name}</span>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold mb-1">나의 학습 이력</h2>
            <p className="text-gray-600">지난 학기별 이수 현황과 상담 내역을 한눈에 확인하세요.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Semester History */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold mb-6">학기별 이수 현황</h3>
                        
                        {/* 2025-2 (Upcoming) */}
                        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                            <button 
                                onClick={() => toggleSemester('2025-2')}
                                className="w-full flex items-center justify-between bg-white p-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-700">2025년 2학기 (수강 예정)</span>
                                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">예정 18학점</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSemesters['2025-2'] ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2025-2'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-100">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">상태</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-white"><td className="px-4 py-3">딥러닝</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI 서비스 개발자 MD" className="text-blue-600" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">캡스톤디자인</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI 서비스 개발자 MD" className="text-blue-600" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">클라우드컴퓨팅</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="웹 풀스택 개발 MD" className="text-purple-600" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">정보보안</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="핀테크 블록체인 MD" className="text-indigo-600" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">인문학과 리더십</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="인문 소양 MD" className="text-gray-500" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">세계시민교육</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="글로벌 역량 MD" className="text-gray-500" /></td><td className="px-4 py-3 text-gray-400">예정</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 2025-1 (Current) */}
                        <div className="mb-4 border border-blue-100 rounded-lg overflow-hidden ring-1 ring-blue-100">
                            <button 
                                onClick={() => toggleSemester('2025-1')}
                                className="w-full flex items-center justify-between bg-blue-50/50 p-4 hover:bg-blue-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-blue-800">2025년 1학기 (수강 중)</span>
                                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">신청 18학점</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${expandedSemesters['2025-1'] ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2025-1'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-blue-100">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-blue-50 text-blue-800 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">상태</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-blue-50">
                                            <tr className="bg-white"><td className="px-4 py-3">머신러닝</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI 서비스 개발자 MD" className="text-blue-600" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">웹 프로그래밍</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="웹 풀스택 개발 MD" className="text-purple-600" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">소프트웨어 공학</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">네트워크</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="웹 풀스택 개발 MD" className="text-purple-600" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">통계학 개론</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="데이터 리터러시 MD" className="text-gray-500" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">심리학의 이해</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-gray-500">수강중</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 2024-2 */}
                        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                             <button 
                                onClick={() => toggleSemester('2024-2')}
                                className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-800">2024년 2학기</span>
                                    <span className="text-sm text-gray-500">총 15학점 (평점: 4.1)</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSemesters['2024-2'] ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2024-2'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">성적</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-white"><td className="px-4 py-3">자료구조</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">알고리즘</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">B+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">운영체제</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">객체지향프로그래밍</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">미적분학 1</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 2024-1 */}
                        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                             <button 
                                onClick={() => toggleSemester('2024-1')}
                                className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-800">2024년 1학기</span>
                                    <span className="text-sm text-gray-500">총 19학점 (평점: 4.2)</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSemesters['2024-1'] ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2024-1'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">성적</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-white"><td className="px-4 py-3">AI 입문</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">프로그래밍 기초</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">데이터베이스</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="빅데이터 경영 MD" className="text-orange-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">컴퓨터 구조</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">B+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">글쓰기</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">영어회화 1</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                         {/* 2023-2 */}
                        <div className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                             <button 
                                onClick={() => toggleSemester('2023-2')}
                                className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-800">2023년 2학기</span>
                                    <span className="text-sm text-gray-500">총 15학점 (평점: 4.0)</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSemesters['2023-2'] ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2023-2'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">성적</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-white"><td className="px-4 py-3">파이썬프로그래밍</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">이산수학</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">대학수학2</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">B+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">대학영어2</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">현대사회의이해</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                         {/* 2023-1 */}
                         <div className="mb-6 last:mb-0 border border-gray-200 rounded-lg overflow-hidden">
                             <button 
                                onClick={() => toggleSemester('2023-1')}
                                className="w-full flex items-center justify-between bg-gray-50 p-4 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-bold text-gray-800">2023년 1학기</span>
                                    <span className="text-sm text-gray-500">총 15학점 (평점: 4.1)</span>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${expandedSemesters['2023-1'] ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 ease-in-out ${expandedSemesters['2023-1'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="border-t border-gray-200">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">교과목명</th>
                                                <th className="px-4 py-3">구분</th>
                                                <th className="px-4 py-3">학점</th>
                                                <th className="px-4 py-3">모듈</th>
                                                <th className="px-4 py-3">성적</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            <tr className="bg-white"><td className="px-4 py-3">SW개론</td><td className="px-4 py-3">전공</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="AI-SW MD" className="text-green-600" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">대학수학1</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">대학영어1</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">컴퓨팅사고</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A+</td></tr>
                                            <tr className="bg-white"><td className="px-4 py-3">창의적문제해결</td><td className="px-4 py-3">교양</td><td className="px-4 py-3">3</td><td className="px-4 py-3"><ModuleLink name="기초 교양" className="text-gray-500" /></td><td className="px-4 py-3 text-blue-600 font-bold">A0</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column: Consulting History (Unchanged) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            학점 관련 상담 내역
                        </h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">완료</span>
                                    <span className="text-xs text-gray-400">2024.11.15</span>
                                </div>
                                <p className="font-medium text-sm text-gray-800 mb-1">졸업 요건 학점 문의</p>
                                <p className="text-xs text-gray-500 line-clamp-2">전공 필수 학점 이수 현황과 남은 학점에 대해 문의했습니다.</p>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">진행중</span>
                                    <span className="text-xs text-gray-400">2025.03.10</span>
                                </div>
                                <p className="font-medium text-sm text-gray-800 mb-1">복수전공 학점 인정</p>
                                <p className="text-xs text-gray-500 line-clamp-2">경영학과 복수전공 시 학점 인정 범위에 대해 상담 요청 중입니다.</p>
                            </div>
                            <div className="border rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">완료</span>
                                    <span className="text-xs text-gray-400">2024.05.02</span>
                                </div>
                                <p className="font-medium text-sm text-gray-800 mb-1">계절학기 수강 상담</p>
                                <p className="text-xs text-gray-500 line-clamp-2">하계 계절학기 수강 가능 과목 및 학점 제한에 대해 문의했습니다.</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition">
                            새로운 상담 신청하기
                        </button>
                    </div>
                </div>
            </div>

            {/* Module Detail Modal Overlay */}
            {selectedModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                            <h3 className="text-xl font-bold text-gray-900">{selectedModule.title} 상세 정보</h3>
                            <button 
                                onClick={() => setSelectedModule(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                            >
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 bg-gray-50 flex-1">
                            <div className="space-y-6">
                                <div className="bg-white border rounded-xl p-6 shadow-sm">
                                    <div className="mb-6">
                                        <h5 className="font-bold text-lg text-gray-900 mb-2">모듈 소개</h5>
                                        <p className="text-gray-700 leading-relaxed">{selectedModule.description}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
                                        <div className="space-y-2">
                                            <span className="font-bold text-blue-600 flex items-center gap-1">
                                                📈 산업 동향
                                            </span>
                                            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100 leading-relaxed">
                                                {selectedModule.industryTrend}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="font-bold text-green-600 flex items-center gap-1">
                                                💼 채용 계획
                                            </span>
                                            <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100 leading-relaxed">
                                                {selectedModule.hiringPlan}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t mt-3">
                                        <span className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wide">구성 교과목</span>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedModule.subjects.map((sub, i) => (
                                                <span key={i} className="text-xs font-medium bg-gray-100 text-blue-700 px-3 py-1.5 rounded-full border border-gray-200">
                                                    {sub}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer Actions */}
                        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end">
                            <button 
                                onClick={() => setSelectedModule(null)}
                                className="px-5 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearningHistoryView;

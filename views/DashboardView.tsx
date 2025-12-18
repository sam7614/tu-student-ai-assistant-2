import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { ChevronDown, AiIcon, XIcon } from '../components/Icons';

// --- Lego Background Logic & Components ---

interface Block {
    id: number;
    col: number;
    targetBottom: number;
    color: string;
    delay: number;
}

const COLORS = [
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#F59E0B', // Yellow
    '#10B981', // Green
    '#FFFFFF', // White
    '#8B5CF6', // Purple
];

const BLOCK_SIZE = 60; // Size of the lego block in pixels

const LegoStackingBackground: React.FC = () => {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    // Track height of each column (in pixels from bottom)
    const colHeights = useRef<number[]>([]); 

    useEffect(() => {
        if (!containerRef.current) return;

        // Calculate columns based on screen width
        const cols = Math.ceil(window.innerWidth / BLOCK_SIZE);
        colHeights.current = new Array(cols).fill(0);

        let blockIdCounter = 0;
        const maxBlocks = 50; // Limit blocks to prevent performance issues

        const interval = setInterval(() => {
            if (blockIdCounter >= maxBlocks) {
                clearInterval(interval);
                return;
            }

            const randomCol = Math.floor(Math.random() * cols);
            const currentColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            
            // Calculate target position (stacking)
            const currentHeight = colHeights.current[randomCol];
            
            // Randomize falling speed slightly
            const fallDuration = 0.8 + Math.random() * 0.5;

            const newBlock: Block = {
                id: blockIdCounter++,
                col: randomCol,
                targetBottom: currentHeight,
                color: currentColor,
                delay: 0,
            };

            setBlocks(prev => [...prev, newBlock]);

            // Update column height for next block
            colHeights.current[randomCol] += (BLOCK_SIZE * 0.8); // 0.8 to create a slight overlap/tight fit look
        }, 600); // Add a block every 600ms

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-gray-100">
            <style>{`
                .lego-block {
                    position: absolute;
                    width: 60px;
                    height: 50px;
                    border-radius: 2px;
                    box-shadow: inset -2px -4px 0 rgba(0,0,0,0.15), 4px 4px 8px rgba(0,0,0,0.05);
                    transition: top 1s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: top;
                }
                /* The Studs on top of the Lego */
                .lego-block::before {
                    content: '';
                    position: absolute;
                    top: -8px;
                    left: 6px;
                    width: 48px;
                    height: 8px;
                    background-color: inherit;
                    filter: brightness(1.1);
                    border-radius: 4px 4px 0 0;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                }
                /* The side 3D effect */
                .lego-block::after {
                    content: '';
                    position: absolute;
                    right: -6px;
                    top: 0;
                    width: 6px;
                    height: 100%;
                    background-color: inherit;
                    filter: brightness(0.8);
                    transform: skewY(-45deg);
                    transform-origin: top left;
                    opacity: 0.5;
                }
            `}</style>
            {blocks.map((block) => (
                <div
                    key={block.id}
                    className="lego-block"
                    style={{
                        left: block.col * BLOCK_SIZE,
                        backgroundColor: block.color,
                        // Start above screen, end at target
                        top: -100, // Initial render position
                        // We use animation/transition to move it to: windowHeight - block.targetBottom
                        transform: `translateY(calc(100vh - ${block.targetBottom + 60}px))`, 
                        transitionDuration: '1.5s'
                    }}
                />
            ))}
        </div>
    );
};

// --- Mock Data Interfaces ---

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

interface WeeklyAnalysisItem {
    id: string;
    title: string;
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

// Mock Data for Weekly Analysis (Early Childhood Education Context)
const WEEKLY_ANALYSIS_DATA: WeeklyAnalysisItem[] = [
    {
        id: 'w1',
        title: '미래형 에듀테크 유아교육',
        industryTrend: 'AI, VR/AR 등 디지털 기술을 활용한 놀이 중심 누리과정 교육 콘텐츠 수요 급증. (키즈 에듀테크 시장 연평균 15% 성장)',
        hiringPlan: '국공립 유치원 및 대형 교육 기업(웅진, 교원 등)에서 디지털 매체 활용 능력을 갖춘 교사 우대 채용 중.',
        reason: '디지털 네이티브 세대인 유아들을 위한 스마트 기기 활용 및 코딩 놀이 지도 역량이 필수적임.',
        subjects: ['유아디지털교육', '놀이지도', '유아교과교육론', '아동관찰및행동연구'],
        interviews: [
            {
                id: 'edu1',
                studentName: '김민서',
                studentId: '20191234 졸업',
                companyName: '웅진씽크빅',
                companyRole: '유아 콘텐츠 기획자',
                location: '서울 마포구',
                industry: '에듀테크 / 출판',
                product: '스마트올 키즈, AI 독서 케어',
                jobDuty: '유아 발달 단계에 맞춘 인터랙티브 학습 콘텐츠 기획 및 디지털 교구 개발',
                question: '모듈 이수가 실무에 어떤 도움이 되었나요?',
                answer: '"\'유아디지털교육\' 수업에서 직접 태블릿용 놀이 자료를 기획하고 시연해본 경험이 입사 후 콘텐츠 기획 업무에 바로 적용되었습니다. 현장 교사들이 필요로 하는 디지털 기능이 무엇인지 파악하는 눈을 길렀습니다."',
                avatarChar: '👩‍💻',
                avatarColor: 'bg-yellow-100'
            },
            {
                id: 'edu2',
                studentName: '이준호',
                studentId: '20205678 졸업',
                companyName: '부산 국공립 푸른솔 유치원',
                companyRole: '유치원 정교사',
                location: '부산 해운대구',
                industry: '유아 교육 기관',
                product: '누리과정 교육',
                jobDuty: '만 5세 학급 담임 및 코딩/로봇 활용 특별 활동 지도',
                question: '현장에서 에듀테크 역량이 필요한가요?',
                answer: '"네, 요즘 아이들은 디지털 기기에 매우 익숙합니다. 알버트 같은 코딩 로봇을 활용해 놀이 수업을 구성했더니 아이들의 몰입도가 훨씬 높았습니다. 모듈에서 배운 교수법이 큰 무기가 되었습니다."',
                avatarChar: '👨‍🏫',
                avatarColor: 'bg-green-100'
            }
        ]
    },
    {
        id: 'w2',
        title: '아동 심리 정서 케어',
        industryTrend: '맞벌이 가정 증가 및 발달 지연 아동 이슈로 인해 보육 현장에서의 심리/정서 케어 전문성 요구 증대.',
        hiringPlan: '직장 어린이집 및 육아종합지원센터에서 아동 상담 및 문제 행동 지도 역량을 갖춘 전문가 수요 증가.',
        reason: '단순 보육을 넘어선 정서적 유대감 형성과 문제 행동 조기 발견 및 중재 능력이 중요해짐.',
        subjects: ['아동상담', '유아발달', '유아사회교육', '부모교육'],
        interviews: [
            {
                id: 'psy1',
                studentName: '최수영',
                studentId: '20189900 졸업',
                companyName: '초록우산 어린이재단',
                companyRole: '아동 사례 관리자',
                location: '부산 중구',
                industry: '사회복지 / NGO',
                product: '아동 복지 사업',
                jobDuty: '위기 가정 아동 상담 및 심리 정서 지원 프로그램 운영',
                question: '모듈 수업이 상담 업무에 도움이 되었나요?',
                answer: '"\'아동상담\' 과목에서 배운 놀이치료 기법과 상담 이론들이 실제 현장에서 아이들의 마음을 여는 데 큰 도움이 되었습니다. 이론뿐만 아니라 역할극 실습을 통해 상담 태도를 익힌 것이 유익했습니다."',
                avatarChar: '👩‍⚕️',
                avatarColor: 'bg-purple-100'
            },
            {
                id: 'psy2',
                studentName: '정우성',
                studentId: '20193344 졸업',
                companyName: '삼성전자 열린 어린이집',
                companyRole: '보육 교사',
                location: '경기 수원',
                industry: '직장 어린이집',
                product: '영유아 보육',
                jobDuty: '영아반 담임 및 영아 발달 관찰 평가, 학부모 상담',
                question: '취업 성공의 비결은 무엇인가요?',
                answer: '"면접 때 \'부모교육\' 수업에서 배운 학부모 상담 시뮬레이션 경험을 이야기하며 소통 능력을 강조했습니다. 단순히 아이를 돌보는 것을 넘어 가정과 연계한 정서 케어 전문가라는 인상을 심어주었습니다."',
                avatarChar: '👨‍🍼',
                avatarColor: 'bg-blue-100'
            }
        ]
    }
];

// Mock Data for Subject Profiles
const SUBJECT_PROFILES: Record<string, SubjectProfile> = {
    '유아디지털교육': {
        name: '유아디지털교육',
        overview: '4차 산업혁명 시대에 발맞춰 유아교육 현장에서 활용 가능한 다양한 디지털 매체와 콘텐츠를 이해하고, 이를 유아의 발달 수준에 맞게 적용하는 방법을 학습한다.',
        objectives: [
            '디지털 매체의 교육적 가치와 활용 방법을 설명할 수 있다.',
            '유아에게 적합한 디지털 놀이 콘텐츠를 선별하고 기획할 수 있다.',
            '태블릿, 코딩 로봇 등 스마트 기기를 활용한 모의 수업을 시연할 수 있다.'
        ],
        competencies: ['디지털 리터러시', '교수학습 설계 능력', '창의적 문제해결력'],
        methods: ['강의 및 토론', 'PBL(프로젝트 기반 학습)', '모의 수업 시연'],
        weeklyPlan: [
            { week: 1, topic: '유아 디지털 교육의 이해 및 필요성', objectives: '디지털 교육의 기본 개념과 현장 적용의 필요성을 이해한다.', materials: '강의 PPT, 관련 논문 요약본' },
            { week: 2, topic: '디지털 매체의 종류와 특성', objectives: '다양한 디지털 매체의 종류와 교육적 특성을 비교 분석한다.', materials: '매체 실물(태블릿, 로봇), 비교표' },
            { week: 3, topic: '유아 발달과 디지털 매체', objectives: '유아의 발달 단계에 따른 적절한 매체 활용 가이드라인을 습득한다.', materials: '발달 심리 교재 3장, 사례 영상' },
            { week: 4, topic: 'AR/VR 활용 놀이 체험', objectives: '증강현실 및 가상현실 기술을 활용한 놀이 사례를 체험하고 분석한다.', materials: 'AR/VR 기기, 체험 앱 리스트' },
            { week: 5, topic: '유아 코딩 교육의 기초 (언플러그드 활동)', objectives: '컴퓨터 없이 컴퓨팅 사고력을 기르는 놀이 활동을 기획한다.', materials: '보드게임, 활동지, 교구' },
            { week: 6, topic: '교육용 로봇 활용 실습', objectives: '교육용 로봇(비봇, 알버트 등)의 조작법을 익히고 수업에 적용한다.', materials: '교육용 로봇 세트, 매뉴얼' },
            { week: 7, topic: '디지털 스토리텔링 기법', objectives: '디지털 도구를 활용하여 유아와 상호작용하는 이야기를 창작한다.', materials: '스토리텔링 앱, 태블릿' },
            { week: 8, topic: '중간고사', objectives: '전반기 학습 내용에 대한 이해도를 평가한다.', materials: '시험지' },
            { week: 9, topic: '디지털 콘텐츠 분석 및 비평', objectives: '시중의 유아용 앱과 영상 콘텐츠를 교육적 관점에서 비평한다.', materials: '분석 평가지, 앱 리스트' },
            { week: 10, topic: '디지털 놀이 활동 계획안 작성', objectives: '디지털 매체를 활용한 단위 활동 계획안을 작성한다.', materials: '계획안 양식, 누리과정 해설서' },
            { week: 11, topic: '멀티미디어 자료 제작 실습', objectives: '수업에 필요한 이미지, 영상 자료를 직접 편집하고 제작한다.', materials: '편집 프로그램(Canva 등), PC' },
            { week: 12, topic: '수업 자료 개발 및 교구 제작', objectives: '디지털 활동과 연계된 오프라인 교구를 제작한다.', materials: '제작 재료(종이, 펠트 등)' },
            { week: 13, topic: '모의 수업 시연 및 피드백 (1)', objectives: '작성한 계획안을 바탕으로 모의 수업을 진행하고 동료 평가를 받는다.', materials: '수업 시연 도구, 평가표' },
            { week: 14, topic: '모의 수업 시연 및 피드백 (2)', objectives: '피드백을 반영하여 수업을 개선하고 재시연한다.', materials: '수업 시연 도구, 평가표' },
            { week: 15, topic: '기말고사 및 포트폴리오 발표', objectives: '학기 동안의 결과물을 정리하여 발표하고 최종 평가를 받는다.', materials: '포트폴리오, 발표 PPT' }
        ]
    },
    '아동상담': {
        name: '아동상담',
        overview: '아동의 문제 행동과 심리적 어려움을 이해하고, 이를 돕기 위한 다양한 상담 이론과 기법을 익혀 유치원 및 보육 현장에서 적용할 수 있는 기초 능력을 기른다.',
        objectives: [
            '아동 상담의 주요 이론(정신분석, 행동주의, 인본주의 등)을 비교 설명할 수 있다.',
            '아동의 부적응 행동 유형을 식별하고 원인을 분석할 수 있다.',
            '놀이 치료 및 미술 치료 등 기본적인 상담 기법을 시연할 수 있다.'
        ],
        competencies: ['공감 및 소통 능력', '아동 관찰 및 분석', '상담 실무 역량'],
        methods: ['사례 분석', '역할극(Role-play)', '현장 전문가 특강'],
        weeklyPlan: [
            { week: 1, topic: '아동 상담의 개념과 윤리', objectives: '아동 상담의 정의와 상담자의 윤리적 태도를 이해한다.', materials: '강의 PPT, 윤리 강령집' },
            { week: 2, topic: '아동 발달과 정신 병리', objectives: '발달 과정에서 나타날 수 있는 정신 병리적 증상을 파악한다.', materials: '사례 영상, DSM-5 요약' },
            { week: 3, topic: '정신분석적 상담 이론', objectives: '프로이트와 에릭슨의 이론을 상담에 적용하는 방법을 배운다.', materials: '이론 요약 핸드아웃' },
            { week: 4, topic: '행동주의 상담 이론', objectives: '강화와 처벌 원리를 이용한 행동 수정 기법을 익힌다.', materials: '행동 수정 계획표 양식' },
            { week: 5, topic: '인간중심 상담 이론', objectives: '공감적 경청과 무조건적 수용의 태도를 실습한다.', materials: '대화 녹취록, 실습지' },
            { week: 6, topic: '초기 면접 및 라포 형성', objectives: '아동 및 부모와의 초기 면접 절차와 라포 형성 기술을 익힌다.', materials: '면접 질문지 리스트' },
            { week: 7, topic: '아동 심리 검사의 이해', objectives: '그림 검사(HTP) 등 투사 검사의 실시 및 해석 방법을 배운다.', materials: '검사 도구(종이, 연필, 지우개)' },
            { week: 8, topic: '중간고사', objectives: '상담 이론에 대한 이해도를 평가한다.', materials: '시험지' },
            { week: 9, topic: '놀이치료의 기초', objectives: '놀이의 치료적 기능을 이해하고 놀이실 구성을 배운다.', materials: '놀이감 목록, 놀이실 사진' },
            { week: 10, topic: '미술치료의 기초', objectives: '미술 활동을 통한 심리 진단 및 치료 기법을 실습한다.', materials: '크레파스, 도화지, 점토' },
            { week: 11, topic: '모래놀이 치료의 이해', objectives: '모래 상자를 활용한 비언어적 상담 기법을 이해한다.', materials: '모래 상자 키트(모형)' },
            { week: 12, topic: 'ADHD 아동 상담 사례', objectives: '주의력 결핍 과잉 행동 장애 아동의 특성과 상담 전략을 연구한다.', materials: '사례 연구 논문' },
            { week: 13, topic: '분리불안 및 등원거부 상담 사례', objectives: '분리 불안을 겪는 아동과 부모를 위한 상담 개입법을 배운다.', materials: '상담 시연 영상' },
            { week: 14, topic: '부모 상담 및 교사 자문', objectives: '부모 면담 기술과 교사 자문 역할을 연습한다.', materials: '부모 상담 시나리오' },
            { week: 15, topic: '기말고사 및 사례 연구 발표', objectives: '한 학기 동안 연구한 상담 사례를 발표하고 피드백을 공유한다.', materials: '발표 PPT, 보고서' }
        ]
    }
    // Default fallback for others
};

const DashboardView: React.FC = () => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [isWeeklyModalOpen, setIsWeeklyModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<SubjectProfile | null>(null);
    const [selectedInterview, setSelectedInterview] = useState<InterviewData | null>(null);

    const toggle = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSubjectClick = (subjectName: string) => {
        // Find profile or provide default mock
        const profile = SUBJECT_PROFILES[subjectName] || {
            name: subjectName,
            overview: `${subjectName} 교과목에 대한 개요 정보입니다. 해당 과목은 유아교육 전문가 양성을 위한 핵심 역량을 다룹니다.`,
            objectives: ['기초 이론 습득', '실무 적용 능력 배양', '전문가적 태도 함양'],
            competencies: ['전공 기초', '문제 해결', '의사소통'],
            methods: ['강의', '토론', '실습'],
            weeklyPlan: Array.from({length: 15}, (_, i) => ({
                week: i + 1,
                topic: `${subjectName} 주요 주제 ${i+1}`,
                objectives: `주차별 핵심 목표 ${i+1} 달성`,
                materials: '강의 PPT, 워크시트'
            }))
        };
        setSelectedSubject(profile);
    };

    const pieData = [
        { name: 'Completed', value: 102, fill: '#2563EB' }, // Blue-600
        { name: 'Remaining', value: 18, fill: '#E5E7EB' }, // Gray-200
    ];

    return (
        <>
            {/* Background Animation */}
            <LegoStackingBackground />

            <div className="animate-fade-in space-y-6 relative z-10">
                {/* Header with glass effect to show background */}
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-white/50">
                    <h2 className="text-3xl font-bold mb-1">안녕하세요, 한상준님! 👋</h2>
                    <p className="text-gray-600">오늘도 나만의 학습 여정을 벽돌 쌓듯 차곡차곡 쌓아보세요.</p>
                </div>

                {/* Module Status Card */}
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">모듈 이수 현황</h3>
                        <a href="#" className="text-sm text-blue-600 hover:underline">전체 상세보기</a>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Status List */}
                        <div className="w-full md:w-1/2 space-y-4">
                            {/* In Progress */}
                            <div className="border-b pb-2">
                                <button onClick={() => toggle('inProgress')} className="w-full flex justify-between items-center text-left py-1">
                                    <span className="text-gray-600">이수 중인 모듈</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">3<span className="text-sm ml-1">개</span></span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['inProgress'] ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['inProgress'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pt-4 pb-2 pl-4">
                                        <h4 className="font-semibold mb-3 text-sm text-gray-800">이수 중인 모듈 상세</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-2">빅데이터 경영 MD</p>
                                                <div className="flex flex-wrap gap-3 text-sm">
                                                    <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">데이터분석 (이수)</span>
                                                    <span className="text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">데이터시각화 (수강중)</span>
                                                    <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">비즈니스 (미이수)</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-2">AI-SW MD</p>
                                                <div className="flex flex-wrap gap-3 text-sm">
                                                    <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">프로그래밍 (이수)</span>
                                                    <span className="text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">컴퓨팅 (수강중)</span>
                                                    <span className="text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded">기초 (미이수)</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 mb-2">디지털마케팅 MD</p>
                                                <div className="flex flex-wrap gap-3 text-sm">
                                                    <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">마케팅 (이수)</span>
                                                    <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">디지털 (이수)</span>
                                                    <span className="text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded">전략 (수강중)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             {/* Completed */}
                             <div className="border-b pb-2">
                                <button onClick={() => toggle('completed')} className="w-full flex justify-between items-center text-left py-1">
                                    <span className="text-gray-600">완료한 모듈</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">3<span className="text-sm ml-1">개</span></span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['completed'] ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['completed'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pt-4 pb-2 pl-4">
                                        <ul className="space-y-2 text-sm">
                                            <li><p className="font-semibold text-gray-900">AI-SW MD</p><p className="text-xs text-gray-500">컴퓨터공학과 / 2024-2 이수</p></li>
                                            <li><p className="font-semibold text-gray-900">프로그래밍 기초</p><p className="text-xs text-gray-500">컴퓨터공학과 / 2024-1 이수</p></li>
                                            <li><p className="font-semibold text-gray-900">데이터분석 입문</p><p className="text-xs text-gray-500">경영학과 / 2024-2 이수</p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Modules (New) */}
                            <div className="border-b pb-2">
                                <button onClick={() => toggle('recommended')} className="w-full flex justify-between items-center text-left py-1">
                                    <span className="text-gray-600">추천 모듈</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">3<span className="text-sm ml-1">개</span></span>
                                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['recommended'] ? 'rotate-180' : ''}`} />
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['recommended'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pt-4 pb-2 pl-4">
                                        <h4 className="font-semibold mb-3 text-sm text-gray-800">추천 융합 모듈 상세</h4>
                                        <ul className="space-y-4 text-sm">
                                            <li>
                                                <p className="font-semibold text-blue-600">AI 컨설팅 융합</p>
                                                <p className="text-xs text-gray-500 mb-1">AI 기술을 비즈니스 문제 해결에 적용하는 컨설팅 역량 강화</p>
                                                <div className="flex flex-wrap gap-2 text-xs">
                                                    <span className="text-red-800 font-medium bg-red-50 px-2 py-0.5 rounded">AI데이터분석</span>
                                                    <span className="text-red-800 font-medium bg-red-50 px-2 py-0.5 rounded">데이터 컨설팅</span>
                                                    <span className="text-red-800 font-medium bg-red-50 px-2 py-0.5 rounded">시장분석</span>
                                                </div>
                                            </li>
                                            <li>
                                                <p className="font-semibold text-blue-600">데이터 기반 마케팅</p>
                                                <p className="text-xs text-gray-500">데이터 분석 기술을 디지털 마케팅 전략 수립에 활용</p>
                                            </li>
                                            <li>
                                                <p className="font-semibold text-blue-600">스마트팩토리 운영</p>
                                                <p className="text-xs text-gray-500">AI와 IoT 기술을 제조업 공정 관리에 적용</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Summary for Module Status */}
                            <div className="pt-2 flex justify-between items-center">
                                <span className="text-gray-800 font-semibold">총 이수 학점</span>
                                <span className="font-bold text-lg text-blue-600">102 / 120 <span className="text-sm">학점</span></span>
                            </div>
                        </div>

                        {/* Donut Chart */}
                        <div className="w-full md:w-1/2 flex justify-center h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                        <Label 
                                            value="85%" 
                                            position="center" 
                                            className="text-3xl font-bold fill-blue-600"
                                            style={{ fontSize: '24px', fontWeight: 'bold' }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                
                {/* My Credits Card */}
                <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold mb-6">나의 이수학점</h3>
                    
                    <div className="space-y-4">
                        {/* Major Credits */}
                        <div className="border-b pb-2">
                             <button onClick={() => toggle('majorCredits')} className="w-full flex justify-between items-center text-left py-1">
                                <span className="text-gray-600">전공 이수 학점</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">57<span className="text-sm ml-1">학점</span></span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['majorCredits'] ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['majorCredits'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                 <div className="pt-4 pb-2 pl-4">
                                    <h4 className="font-semibold mb-4 text-sm text-gray-800">전공 이수 교과목 내역 (19과목)</h4>
                                    <div className="overflow-x-auto text-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학기</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교과목명</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이수학점</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {/* 2023 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-1</td><td className="px-6 py-4 whitespace-nowrap">SW개론</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-2</td><td className="px-6 py-4 whitespace-nowrap">파이썬프로그래밍</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-2</td><td className="px-6 py-4 whitespace-nowrap">이산수학</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2024 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">AI 입문</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">프로그래밍 기초</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">데이터베이스</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">컴퓨터 구조</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-2</td><td className="px-6 py-4 whitespace-nowrap">자료구조</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-2</td><td className="px-6 py-4 whitespace-nowrap">알고리즘</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-2</td><td className="px-6 py-4 whitespace-nowrap">운영체제</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-2</td><td className="px-6 py-4 whitespace-nowrap">객체지향프로그래밍</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2025-1 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">머신러닝</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">웹 프로그래밍</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">소프트웨어 공학</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">네트워크</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2025-2 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">딥러닝</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">캡스톤디자인</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">클라우드컴퓨팅</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">정보보안</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* General Credits */}
                         <div className="border-b pb-2">
                             <button onClick={() => toggle('generalCredits')} className="w-full flex justify-between items-center text-left py-1">
                                <span className="text-gray-600">교양 이수 학점</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">42<span className="text-sm ml-1">학점</span></span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['generalCredits'] ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['generalCredits'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                 <div className="pt-4 pb-2 pl-4">
                                    <h4 className="font-semibold mb-4 text-sm text-gray-800">교양 이수 교과목 내역 (14과목)</h4>
                                    <div className="overflow-x-auto text-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학기</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교과목명</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이수학점</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {/* 2023 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-1</td><td className="px-6 py-4 whitespace-nowrap">대학수학1</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-1</td><td className="px-6 py-4 whitespace-nowrap">대학영어1</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-1</td><td className="px-6 py-4 whitespace-nowrap">컴퓨팅사고</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-1</td><td className="px-6 py-4 whitespace-nowrap">창의적문제해결</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-2</td><td className="px-6 py-4 whitespace-nowrap">대학수학2</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-2</td><td className="px-6 py-4 whitespace-nowrap">대학영어2</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2023-2</td><td className="px-6 py-4 whitespace-nowrap">현대사회의이해</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2024 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">글쓰기</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-1</td><td className="px-6 py-4 whitespace-nowrap">영어회화 1</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2024-2</td><td className="px-6 py-4 whitespace-nowrap">미적분학 1</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2025-1 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">통계학 개론</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-1</td><td className="px-6 py-4 whitespace-nowrap">심리학의 이해</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                {/* 2025-2 */}
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">인문학과 리더십</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                                <tr><td className="px-6 py-4 whitespace-nowrap">2025-2</td><td className="px-6 py-4 whitespace-nowrap">세계시민교육</td><td className="px-6 py-4 whitespace-nowrap">3</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Other Credits */}
                        <div className="border-b pb-2">
                             <button onClick={() => toggle('otherCredits')} className="w-full flex justify-between items-center text-left py-1">
                                <span className="text-gray-600">그 외 학점</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">3<span className="text-sm ml-1">학점</span></span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['otherCredits'] ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['otherCredits'] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                 <div className="pt-4 pb-2 pl-4">
                                    <h4 className="font-semibold mb-4 text-sm text-gray-800">그 외 이수 내역</h4>
                                    <div className="overflow-x-auto text-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구분</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">활동명</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인정학점</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">비교과</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">Mission building</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">3</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total Credits */}
                        <div className="pt-2">
                            <button onClick={() => toggle('totalCredits')} className="w-full flex justify-between items-center text-left py-1">
                                <span className="text-gray-800 font-semibold">총 이수 학점</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-blue-600">102<span className="text-sm ml-1">학점</span></span>
                                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expanded['totalCredits'] ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                             <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expanded['totalCredits'] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-4 mt-2">
                                    <h4 className="font-semibold mb-4 text-sm text-gray-800">학기별 이수 교과목 내역</h4>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학기</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교과목명</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이수구분</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이수학점</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2023-1 학기 (15 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2023-1</td><td className="px-6 py-4">대학수학1</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-1</td><td className="px-6 py-4">대학영어1</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-1</td><td className="px-6 py-4">컴퓨팅사고</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-1</td><td className="px-6 py-4">창의적문제해결</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-1</td><td className="px-6 py-4">SW개론</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>

                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2023-2 학기 (15 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2023-2</td><td className="px-6 py-4">대학수학2</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-2</td><td className="px-6 py-4">대학영어2</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-2</td><td className="px-6 py-4">파이썬프로그래밍</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-2</td><td className="px-6 py-4">이산수학</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2023-2</td><td className="px-6 py-4">현대사회의이해</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>

                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2024-1 학기 (18 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">AI 입문</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">프로그래밍 기초</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">데이터베이스</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">컴퓨터 구조</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">글쓰기</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-1</td><td className="px-6 py-4">영어회화 1</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                
                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2024-2 학기 (15 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">자료구조</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">알고리즘</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">운영체제</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">객체지향프로그래밍</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">미적분학 1</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>

                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2025-1 학기 (18 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">머신러닝</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">웹 프로그래밍</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">소프트웨어 공학</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">네트워크</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">통계학 개론</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-1</td><td className="px-6 py-4">심리학의 이해</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>

                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">2025-2 학기 (18 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">딥러닝</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">캡스톤디자인</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">클라우드컴퓨팅</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">정보보안</td><td className="px-6 py-4">전공</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">인문학과 리더십</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>
                                                <tr><td className="px-6 py-4">2025-2</td><td className="px-6 py-4">세계시민교육</td><td className="px-6 py-4">교양</td><td className="px-6 py-4">3</td></tr>

                                                <tr className="bg-gray-50 font-medium"><td colSpan={4} className="px-6 py-2">기타 (3 학점)</td></tr>
                                                <tr><td className="px-6 py-4">2024-2</td><td className="px-6 py-4">Mission building</td><td className="px-6 py-4">비교과</td><td className="px-6 py-4">3</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teaser Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-sm">
                        <button 
                            onClick={() => setIsWeeklyModalOpen(true)} 
                            className="w-full h-full p-6 text-left focus:outline-none transition-colors hover:bg-gray-50 rounded-lg relative"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-gray-700">이번 주 추천 모듈</h3>
                                <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-full">
                                    <AiIcon className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <p className="text-3xl font-bold">2<span className="text-lg ml-1">개</span></p>
                            <p className="text-sm text-gray-500 mt-1">신규 모듈 / 3개 항목</p>
                            <div className="absolute bottom-6 right-6">
                                <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full font-semibold border border-blue-100">Click to View Analysis</span>
                            </div>
                        </button>
                    </div>

                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-gray-700">모듈 카트</h3>
                            <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                                 <svg className="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold">85<span className="text-lg">%</span></p>
                        <p className="text-sm text-gray-500 mt-1">현재 이수율 / <span className="text-green-600 font-medium">↑ 15% 향상</span></p>
                    </div>

                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-gray-700">중요 알림</h3>
                            <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-full">
                                <svg className="w-6 h-6 text-red-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 15h3a2 2 0 0 1 2 2v3"></path><line x1="12" y1="12" x2="12" y2="12"></line><path d="M12 18s-4-3-4-5a4 4 0 1 1 8 0c0 2-4 5-4 5z"></path></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-red-600">D-3</p>
                        <p className="text-sm text-gray-500 mt-1">수강신청 마감 임박</p>
                    </div>
                </div>

                {/* Weekly Analysis Modal */}
                {isWeeklyModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    🧸 유아교육 최신 트렌드 분석 리포트
                                </h3>
                                <button 
                                    onClick={() => setIsWeeklyModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="p-6 bg-gray-50 flex-1">
                                <div className="space-y-6">
                                    {WEEKLY_ANALYSIS_DATA.map((item) => (
                                        <div key={item.id} className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3 mb-4 border-b pb-3">
                                                <span className="bg-pink-100 text-pink-700 text-xs px-2.5 py-1 rounded-full font-bold">HOT TREND</span>
                                                <h5 className="font-bold text-xl text-gray-900">{item.title}</h5>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-4">
                                                <div className="space-y-2">
                                                    <span className="font-bold text-blue-600 flex items-center gap-1">
                                                        📈 교육/산업 동향
                                                    </span>
                                                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100 leading-relaxed">
                                                        {item.industryTrend}
                                                    </p>
                                                </div>
                                                <div className="space-y-2">
                                                    <span className="font-bold text-green-600 flex items-center gap-1">
                                                        💼 교원 채용 계획
                                                    </span>
                                                    <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100 leading-relaxed">
                                                        {item.hiringPlan}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <span className="font-bold text-gray-700 block mb-1">💡 추천 이유</span>
                                                    <p className="text-gray-600 leading-relaxed">{item.reason}</p>
                                                </div>
                                                <div className="pt-3 border-t mt-3">
                                                    <span className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wide">구성 교과목 (클릭하여 상세 정보 확인)</span>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.subjects.map((sub, i) => (
                                                            <button 
                                                                key={i} 
                                                                onClick={() => handleSubjectClick(sub)}
                                                                className="text-xs font-medium bg-gray-100 text-blue-700 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
                                                            >
                                                                {sub}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Employment & Interview Section */}
                                            {item.interviews && item.interviews.length > 0 && (
                                                <div className="bg-white border rounded-xl p-6 shadow-sm mt-4">
                                                    <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                                        🎓 졸업생 취업 현황 및 인터뷰
                                                    </h5>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {item.interviews.map((interview) => (
                                                            <div 
                                                                key={interview.id}
                                                                onClick={() => setSelectedInterview(interview)}
                                                                className="border rounded-lg p-5 hover:shadow-md hover:border-blue-300 cursor-pointer transition-all flex flex-col gap-3 bg-white"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-12 h-12 rounded-full ${interview.avatarColor} flex items-center justify-center text-2xl shadow-inner flex-shrink-0`}>
                                                                        {interview.avatarChar}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex justify-between items-start">
                                                                            <h6 className="font-bold text-gray-800 text-sm">{interview.studentName}</h6>
                                                                            <span className="text-[10px] text-gray-400">{interview.studentId}</span>
                                                                        </div>
                                                                        <div className="text-sm font-bold text-blue-700 truncate">{interview.companyName}</div>
                                                                        <div className="text-xs text-gray-500">{interview.companyRole}</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                {/* Employment Info */}
                                                                <div className="flex gap-2 text-[11px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100">
                                                                    <span className="flex-1 truncate">🏭 {interview.industry}</span>
                                                                    <span className="w-px bg-gray-300 h-3 self-center"></span>
                                                                    <span className="flex-1 truncate">📦 {interview.product}</span>
                                                                </div>

                                                                {/* Interview Snippet */}
                                                                <div className="relative pl-3 border-l-2 border-blue-200">
                                                                    <p className="text-xs text-gray-700 italic line-clamp-2">
                                                                        {interview.answer}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end">
                                 <button 
                                    onClick={() => setIsWeeklyModalOpen(false)}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                                >
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Interview Detail Modal (Level 2) */}
                {selectedInterview && (
                    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative flex flex-col">
                            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    🎙️ 졸업생 인터뷰 상세
                                </h3>
                                <button onClick={() => setSelectedInterview(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 bg-gray-50 overflow-y-auto flex-1">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Left: Profile & Company */}
                                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                                        <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col items-center">
                                            <div className={`w-24 h-24 rounded-full ${selectedInterview.avatarColor} mb-4 flex items-center justify-center shadow-inner`}>
                                                <span className="text-5xl">{selectedInterview.avatarChar}</span>
                                            </div>
                                            <h4 className="font-bold text-xl text-gray-900 mb-1">{selectedInterview.studentName}</h4>
                                            <span className="text-sm text-gray-500 mb-4">{selectedInterview.studentId}</span>
                                            
                                            <div className="w-full pt-4 border-t space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-lg">🏢</div>
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-500">재직 기업</div>
                                                        <div className="font-bold text-blue-800">{selectedInterview.companyName}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-lg">📍</div>
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-500">근무지</div>
                                                        <div className="font-medium text-gray-700">{selectedInterview.location}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4 text-sm">
                                            <div>
                                                <h6 className="font-bold text-gray-700 mb-1 flex items-center gap-1">🏭 핵심 산업</h6>
                                                <p className="text-gray-600">{selectedInterview.industry}</p>
                                            </div>
                                            <div>
                                                <h6 className="font-bold text-gray-700 mb-1 flex items-center gap-1">📦 주요 생산품/서비스</h6>
                                                <p className="text-gray-600">{selectedInterview.product}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Job & Interview */}
                                    <div className="w-full md:w-2/3 flex flex-col gap-6">
                                        {/* Job Duty */}
                                        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                                            <h5 className="flex items-center gap-2 font-bold text-blue-600 mb-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                주요 담당 직무 : {selectedInterview.companyRole}
                                            </h5>
                                            <p className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-50">
                                                {selectedInterview.jobDuty}
                                            </p>
                                        </div>

                                        {/* Q&A */}
                                        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">Q</div>
                                                <h5 className="font-bold text-lg text-orange-900 pt-0.5">{selectedInterview.question}</h5>
                                            </div>
                                            <div className="relative pl-8 pr-4 py-2 flex-1">
                                                <span className="absolute top-0 left-0 text-5xl text-orange-200 font-serif leading-none">“</span>
                                                <p className="text-gray-700 italic leading-relaxed text-lg">
                                                    {selectedInterview.answer}
                                                </p>
                                                <span className="absolute bottom-0 right-0 text-5xl text-orange-200 font-serif leading-none">”</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Subject Profile Modal (Level 2) */}
                {selectedSubject && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                         <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative flex flex-col">
                            <div className="sticky top-0 bg-blue-600 px-6 py-4 flex justify-between items-center z-10 text-white">
                                <div>
                                    <span className="text-xs font-medium opacity-80 mb-1 block">교과목 프로파일</span>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        📖 {selectedSubject.name}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedSubject(null)}
                                    className="p-2 hover:bg-blue-700 rounded-full transition-colors text-white"
                                >
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Overview */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">교과목 개요</h4>
                                    <p className="text-gray-800 bg-gray-50 p-4 rounded-lg leading-relaxed border border-gray-100">
                                        {selectedSubject.overview}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Objectives */}
                                    <div>
                                        <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">학습 목표</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100 h-full">
                                            {selectedSubject.objectives.map((obj, i) => (
                                                <li key={i} className="leading-snug">{obj}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    {/* Competencies & Methods */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-bold text-purple-600 uppercase tracking-wide mb-2">핵심 전공 역량</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedSubject.competencies.map((comp, i) => (
                                                    <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded border border-purple-100 font-medium">
                                                        {comp}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wide mb-2">주요 교수 방법</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedSubject.methods.map((method, i) => (
                                                    <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded border border-orange-100 font-medium">
                                                        {method}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Weekly Plan */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">주차별 강의 계획</h4>
                                    <div className="border rounded-lg overflow-hidden text-sm shadow-sm">
                                        <div className="max-h-80 overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs sticky top-0">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left whitespace-nowrap w-16">주차</th>
                                                        <th className="px-4 py-3 text-left whitespace-nowrap w-1/4">주제</th>
                                                        <th className="px-4 py-3 text-left whitespace-nowrap">학습 목표</th>
                                                        <th className="px-4 py-3 text-left whitespace-nowrap w-1/4">강의자료</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-100">
                                                    {selectedSubject.weeklyPlan.map((plan, i) => (
                                                        <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                                            <td className="px-4 py-3 text-gray-900 font-medium text-center">{plan.week}주</td>
                                                            <td className="px-4 py-3 text-gray-800 font-semibold">{plan.topic}</td>
                                                            <td className="px-4 py-3 text-gray-600">{plan.objectives}</td>
                                                            <td className="px-4 py-3 text-gray-500 text-xs">
                                                                <span className="bg-gray-100 px-2 py-1 rounded text-gray-600 border border-gray-200">
                                                                    {plan.materials}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DashboardView;
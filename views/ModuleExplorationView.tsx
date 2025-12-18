
import React, { useState } from 'react';
import { XIcon, CheckIcon, PlusIcon } from '../components/Icons';

interface ModuleItem {
    id: string;
    category: string;
    title: string;
    description: string;
    completedCount: number;
    takingCount: number;
    tags: string[];
    colorClass: string;
}

// Interface for Interview Data
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

interface ModuleDetail extends ModuleItem {
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

// Mock Data for Subject Profiles
const SUBJECT_PROFILES: Record<string, SubjectProfile> = {
    '머신러닝': {
        name: '머신러닝',
        overview: '인공지능의 핵심 분야인 머신러닝의 기본 개념과 알고리즘을 학습하고, 파이썬 라이브러리(Scikit-learn)를 활용하여 실제 데이터를 분석하고 예측 모델을 구현하는 능력을 기른다.',
        objectives: [
            '지도학습, 비지도학습, 강화학습의 개념과 차이를 설명할 수 있다.',
            '다양한 머신러닝 알고리즘(회귀, 분류, 클러스터링)의 원리를 이해한다.',
            '실제 데이터셋을 활용하여 모델을 학습시키고 성능을 평가할 수 있다.'
        ],
        competencies: ['데이터 분석', '알고리즘 구현', '문제 해결 능력'],
        methods: ['이론 강의', '실습(Lab)', '텀 프로젝트'],
        weeklyPlan: [
            { week: 1, topic: '머신러닝 개요 및 환경 설정', objectives: 'AI와 머신러닝의 개념 이해 및 Python 실습 환경 구축', materials: '강의 슬라이드, Anaconda 설치 가이드' },
            { week: 2, topic: '데이터 전처리 및 탐색', objectives: 'Pandas, Numpy를 활용한 데이터 핸들링 기법 습득', materials: '실습 코드, 데이터셋' },
            { week: 3, topic: '선형 회귀 (Linear Regression)', objectives: '회귀 분석의 원리 이해 및 비용 함수 개념 학습', materials: '강의 노트, 예제 코드' },
            { week: 4, topic: '로지스틱 회귀 (Logistic Regression)', objectives: '분류 문제 해결을 위한 로지스틱 회귀 모델 구현', materials: '실습 과제, 논문 요약' },
            { week: 5, topic: '의사결정나무 (Decision Tree)', objectives: '트리 기반 모델의 구조 이해 및 과적합 방지 기법 학습', materials: '시각화 도구 설명서' },
            { week: 6, topic: '앙상블 학습 (Ensemble Learning)', objectives: '랜덤 포레스트, 부스팅 등 앙상블 기법의 원리 파악', materials: '비교 실험 결과표' },
            { week: 7, topic: '지지 벡터 머신 (SVM)', objectives: '마진과 커널 트릭을 활용한 데이터 분류 기법 학습', materials: '수학적 원리 해설지' },
            { week: 8, topic: '중간고사', objectives: '전반기 학습 내용 평가', materials: '시험지' },
            { week: 9, topic: '비지도 학습: 클러스터링', objectives: 'K-means, 계층적 군집화 등 비지도 학습 알고리즘 실습', materials: '군집화 사례 영상' },
            { week: 10, topic: '차원 축소 (PCA)', objectives: '고차원 데이터의 시각화 및 특징 추출 기법 이해', materials: 'PCA 활용 사례집' },
            { week: 11, topic: '모델 성능 평가 및 튜닝', objectives: '교차 검증, 그리드 서치 등을 통한 하이퍼파라미터 최적화', materials: '성능 지표 정리표' },
            { week: 12, topic: '딥러닝 기초 (Neural Networks)', objectives: '인공 신경망의 기본 구조 및 역전파 알고리즘 맛보기', materials: '기초 딥러닝 예제' },
            { week: 13, topic: '미니 프로젝트: 데이터 분석 1', objectives: 'Kaggle 데이터셋을 활용한 예측 모델 설계 및 구현', materials: '프로젝트 가이드라인' },
            { week: 14, topic: '미니 프로젝트: 데이터 분석 2', objectives: '모델 성능 개선 및 결과 시각화', materials: '발표 양식' },
            { week: 15, topic: '기말고사 및 프로젝트 발표', objectives: '최종 성과 공유 및 피드백', materials: '포트폴리오' }
        ]
    },
    'Unity 게임 엔진 기초': {
        name: 'Unity 게임 엔진 기초',
        overview: '세계적으로 가장 널리 사용되는 게임 엔진인 Unity의 인터페이스와 기능을 익히고, C# 스크립팅을 통해 2D 및 3D 게임을 직접 제작해보는 실습 중심 강좌입니다.',
        objectives: [
            'Unity 에디터의 인터페이스와 기본 컴포넌트를 능숙하게 다룰 수 있다.',
            'C# 스크립트를 작성하여 게임 오브젝트의 동작을 제어할 수 있다.',
            '간단한 3D 플랫포머 게임을 완성하고 빌드할 수 있다.'
        ],
        competencies: ['게임 엔진 활용', '프로그래밍 기초', '콘텐츠 제작'],
        methods: ['실습 위주', '튜토리얼 따라하기', '개별 프로젝트'],
        weeklyPlan: Array.from({length: 15}, (_, i) => ({
            week: i + 1,
            topic: `Unity 기초 실습 ${i+1}`,
            objectives: '엔진 기능 숙달 및 스크립팅 기초',
            materials: 'Unity 매뉴얼, 예제 프로젝트'
        }))
    }
};

// Helper to generate mock interviews based on module category
const generateInterviews = (moduleTitle: string): InterviewData[] => {
    const interviews: InterviewData[] = [];
    
    if (moduleTitle.includes('AI')) {
        interviews.push(
            {
                id: 'ai1', studentName: '김태영', studentId: '20182233 졸업', companyName: '네이버 (Naver)', companyRole: 'AI Search Engineer',
                location: '경기 성남', industry: 'IT 플랫폼', product: '네이버 검색, 클로바 AI', jobDuty: '대규모 검색 모델 최적화 및 NLU 연구',
                question: '모듈 이수가 취업에 어떤 도움이 되었나요?', answer: '"AI 서비스 개발자 모듈의 캡스톤 디자인 프로젝트에서 챗봇을 구현한 경험이 결정적이었습니다. 이론을 넘어 실제 서비스 배포까지 해본 경험을 면접관님들이 높게 평가하셨습니다."',
                avatarChar: '👨‍💻', avatarColor: 'bg-purple-100'
            },
            {
                id: 'ai2', studentName: '이소연', studentId: '20190123 졸업', companyName: '카카오엔터프라이즈', companyRole: 'ML Ops Engineer',
                location: '경기 성남', industry: 'IT 서비스', product: 'Kakao i Cloud', jobDuty: '머신러닝 파이프라인 구축 및 모델 서빙 최적화',
                question: '후배들에게 한마디?', answer: '"파이썬 프로그래밍 기초부터 탄탄히 다지세요. 모듈에서 배우는 데이터 처리 기술은 현업에서 매일 사용됩니다."',
                avatarChar: '👩‍💻', avatarColor: 'bg-blue-100'
            },
            {
                id: 'ai3', studentName: '박지훈', studentId: '20205566 졸업', companyName: 'LG전자', companyRole: 'Vision AI 연구원',
                location: '서울 강서구', industry: '제조/전자', product: '로봇 청소기 AI', jobDuty: '사물 인식 비전 알고리즘 경량화',
                question: '이 모듈의 가장 큰 장점은?', answer: '"컴퓨터 비전 과목에서 다룬 CNN 모델링 실습이 실무와 직결되었습니다. 학부 수준에서 접하기 힘든 딥러닝 프로젝트 경험이 취업의 열쇠였습니다."',
                avatarChar: '🤖', avatarColor: 'bg-green-100'
            }
        );
    } else if (moduleTitle.includes('게임') || moduleTitle.includes('메타버스')) {
        interviews.push(
            {
                id: 'gm1', studentName: '박민수', studentId: '20195566 졸업', companyName: '넥슨 (Nexon)', companyRole: 'Client Programmer',
                location: '경기 성남', industry: '게임', product: '메이플스토리', jobDuty: '게임 클라이언트 콘텐츠 개발 및 최적화',
                question: '모듈 수업 중 가장 유익했던 점은?', answer: '"유니티 엔진 기초 수업에서 만든 포트폴리오 덕분에 서류 전형을 통과했습니다. 교수님의 1:1 코드 리뷰가 실력 향상에 큰 도움이 되었습니다."',
                avatarChar: '🎮', avatarColor: 'bg-red-100'
            },
            {
                id: 'gm2', studentName: '최지수', studentId: '20201122 졸업', companyName: '펄어비스', companyRole: 'Technical Artist',
                location: '경기 과천', industry: '게임', product: '검은사막', jobDuty: '그래픽 리소스 최적화 및 쉐이더 제작',
                question: '비전공자도 할 수 있나요?', answer: '"저도 디자인과 복수전공으로 시작했습니다. 모듈 과정은 기초부터 알려주기 때문에 열정만 있다면 충분히 가능합니다."',
                avatarChar: '🎨', avatarColor: 'bg-orange-100'
            }
        );
    } else if (moduleTitle.includes('마케팅')) {
        interviews.push(
            {
                id: 'mk1', studentName: '정우성', studentId: '20189988 졸업', companyName: '우아한형제들', companyRole: 'Performance Marketer',
                location: '서울 송파', industry: 'O2O 플랫폼', product: '배달의민족', jobDuty: '퍼포먼스 마케팅 캠페인 운영 및 데이터 분석',
                question: '데이터 분석 역량이 왜 중요한가요?', answer: '"이제 마케팅은 감이 아닌 데이터입니다. 모듈에서 배운 SQL과 파이썬 데이터 분석 능력이 없었다면 지금의 업무를 수행하기 어려웠을 겁니다."',
                avatarChar: '📈', avatarColor: 'bg-green-100'
            }
        );
    } else {
        // Generic Fallback
        interviews.push(
            {
                id: 'gen1', studentName: '한지민', studentId: '20197777 졸업', companyName: '부산교통공사', companyRole: '사무 행정',
                location: '부산 부산진구', industry: '공공기관', product: '도시철도 운영', jobDuty: '일반 행정 및 기획 업무 지원',
                question: '이 모듈을 추천하는 이유는?', answer: '"다양한 분야의 지식을 융합하여 배울 수 있어 시야가 넓어졌습니다. 특히 문제 해결 프로젝트 경험은 자소서 소재로 아주 좋았습니다."',
                avatarChar: '👩‍💼', avatarColor: 'bg-gray-100'
            }
        );
    }
    return interviews;
};

// Helper to generate mock details for demo purposes
const generateDetail = (base: ModuleItem): ModuleDetail => {
    let subjects = ['전공 기초', '심화 응용', '캡스톤 디자인', '실무 프로젝트', '최신 트렌드 특강'];
    
    // Customize subjects based on title for more realism
    if (base.title.includes('AI')) {
        subjects = ['파이썬프로그래밍', '머신러닝', '딥러닝', '컴퓨터비전', 'AI서비스캡스톤'];
    } else if (base.title.includes('게임') || base.title.includes('메타버스')) {
        subjects = ['C#프로그래밍', 'Unity 게임 엔진 기초', '3D그래픽스', '메타버스콘텐츠제작', '게임서버프로그래밍'];
    } else if (base.title.includes('마케팅')) {
        subjects = ['경영학원론', '마케팅관리', '소비자행동론', '디지털마케팅실습', '빅데이터분석'];
    } else if (base.title.includes('디자인')) {
        subjects = ['디자인발상', 'UI/UX디자인', '타이포그래피', '브랜드디자인', '포트폴리오제작'];
    }

    return {
        ...base,
        industryTrend: `${base.title} 관련 산업은 연평균 15% 이상 고성장 중이며, 현장 실무 능력을 갖춘 인재 수요가 급증하고 있습니다.`,
        hiringPlan: '주요 대기업 및 유망 스타트업에서 관련 직무 신입 채용을 확대하고 있으며, 포트폴리오 중심의 평가가 이루어집니다.',
        reason: '본 모듈은 이론뿐만 아니라 실제 프로젝트 경험을 쌓을 수 있도록 구성되어 있어 취업 경쟁력을 크게 높일 수 있습니다.',
        subjects: subjects,
        interviews: generateInterviews(base.title) // Generate interviews
    };
};

const DEPT_MODULES: ModuleItem[] = [
    {
        id: 'd1',
        category: 'AI학부',
        title: 'AI 서비스 개발자 MD',
        description: '파이썬 기반의 머신러닝/딥러닝 모델링부터 실제 웹 서비스 배포까지 전 과정을 마스터하는 동명대 대표 모듈입니다.',
        completedCount: 128,
        takingCount: 45,
        tags: ['인공지능', '웹개발', '인기'],
        colorClass: 'bg-blue-100 text-blue-800'
    },
    {
        id: 'd2',
        category: '게임공학과',
        title: '메타버스 게임 제작 MD',
        description: 'Unity와 Unreal Engine을 활용하여 가상현실(VR) 및 메타버스 콘텐츠를 직접 제작하는 실무형 과정입니다.',
        completedCount: 105,
        takingCount: 38,
        tags: ['유니티', 'VR/AR', '메타버스'],
        colorClass: 'bg-purple-100 text-purple-800'
    },
    {
        id: 'd3',
        category: '시각디자인학과',
        title: 'UX/UI 브랜드 디자인 MD',
        description: '사용자 경험(UX) 분석을 기반으로 모바일 앱과 웹 인터페이스 디자인 실무를 익혀 포트폴리오를 완성합니다.',
        completedCount: 92,
        takingCount: 41,
        tags: ['디자인', '피그마', '포트폴리오'],
        colorClass: 'bg-pink-100 text-pink-800'
    },
    {
        id: 'd4',
        category: '경영학과',
        title: '디지털 빅데이터 마케팅 MD',
        description: 'GA4, 파이썬 등을 활용해 고객 데이터를 분석하고 퍼포먼스 마케팅 전략을 수립하는 데이터 기반 마케터 양성 과정입니다.',
        completedCount: 76,
        takingCount: 25,
        tags: ['데이터분석', '마케팅', '자격증'],
        colorClass: 'bg-green-100 text-green-800'
    },
    {
        id: 'd5',
        category: '반려동물보건학과',
        title: '반려동물 케어 전문가 MD',
        description: '반려동물 행동 교정, 영양학, 기초 보건 지식을 습득하여 펫코노미 시대의 전문 케어 인력을 양성합니다.',
        completedCount: 65,
        takingCount: 30,
        tags: ['유망직종', '실습위주', '펫케어'],
        colorClass: 'bg-yellow-100 text-yellow-800'
    },
    {
        id: 'd6',
        category: '건축학과',
        title: 'BIM 스마트 건축 설계 MD',
        description: '3D 모델링 기술인 BIM을 활용하여 스마트 건축물 설계 및 시공 관리 능력을 배양합니다.',
        completedCount: 58,
        takingCount: 12,
        tags: ['건축기사', '스마트건설', '3D모델링'],
        colorClass: 'bg-indigo-100 text-indigo-800'
    },
    {
        id: 'd7',
        category: '미디어커뮤니케이션학과',
        title: '1인 미디어 크리에이터 MD',
        description: '영상 기획, 촬영, 편집(프리미어, 애프터이펙트) 기술을 익혀 유튜브 등 뉴미디어 콘텐츠 전문가로 성장합니다.',
        completedCount: 55,
        takingCount: 18,
        tags: ['유튜브', '영상편집', '크리에이터'],
        colorClass: 'bg-red-100 text-red-800'
    },
    {
        id: 'd8',
        category: '항만물류시스템학과',
        title: '글로벌 스마트 물류 MD',
        description: '부산항만 기반의 글로벌 물류 프로세스와 AI/IoT 기반의 스마트 물류 시스템 운영을 학습합니다.',
        completedCount: 42,
        takingCount: 8,
        tags: ['취업연계', '부산항', 'SCM'],
        colorClass: 'bg-cyan-100 text-cyan-800'
    }
];

const CONV_MODULES: ModuleItem[] = [
    {
        id: 'c1',
        category: '컴퓨터+경영',
        title: 'AI 융합 비즈니스 MD',
        description: '비즈니스 도메인 지식에 AI 기술을 접목하여 혁신적인 사업 모델을 기획하고 데이터를 분석합니다.',
        completedCount: 88,
        takingCount: 34,
        tags: ['AI경영', '데이터비즈니스', '융합'],
        colorClass: 'bg-purple-100 text-purple-800'
    },
    {
        id: 'c2',
        category: '기계+산업+컴공',
        title: '스마트 팩토리 운영 MD',
        description: '제조 공정에 IoT 센서와 AI 기술을 적용하여 생산 효율성을 극대화하는 스마트 공장 전문가를 양성합니다.',
        completedCount: 72,
        takingCount: 29,
        tags: ['스마트제조', 'IoT', '공정최적화'],
        colorClass: 'bg-indigo-100 text-indigo-800'
    },
    {
        id: 'c3',
        category: '콘텐츠+컴공',
        title: '문화콘텐츠 테크놀로지 MD',
        description: '문화예술 콘텐츠에 VR/AR 등 최신 IT 기술을 결합하여 새로운 경험을 제공하는 실감형 콘텐츠를 제작합니다.',
        completedCount: 64,
        takingCount: 22,
        tags: ['실감미디어', '예술공학', '전시기술'],
        colorClass: 'bg-pink-100 text-pink-800'
    },
    {
        id: 'c4',
        category: '금융+컴공',
        title: '핀테크 블록체인 MD',
        description: '금융 산업의 디지털 전환에 맞춰 블록체인 기술과 핀테크 서비스 기획 역량을 갖춘 인재를 양성합니다.',
        completedCount: 50,
        takingCount: 15,
        tags: ['금융IT', '블록체인', '보안'],
        colorClass: 'bg-blue-100 text-blue-800'
    },
    {
        id: 'c5',
        category: '간호+컴공',
        title: '디지털 헬스케어 MD',
        description: '의료 데이터 분석과 스마트 헬스케어 기기 활용 능력을 통해 미래형 의료 서비스를 선도합니다.',
        completedCount: 45,
        takingCount: 12,
        tags: ['의료IT', '바이오데이터', '건강관리'],
        colorClass: 'bg-teal-100 text-teal-800'
    }
];

const EXP_MODULES: ModuleItem[] = [
    {
        id: 'e1',
        category: '기초탐색',
        title: '코딩 기초 탐색 MD',
        description: '전공과 무관하게 누구나 쉽게 파이썬 프로그래밍의 기초를 배우고 컴퓨팅 사고력을 키우는 입문 과정입니다.',
        completedCount: 210,
        takingCount: 85,
        tags: ['비전공자추천', '파이썬', 'SW입문'],
        colorClass: 'bg-orange-100 text-orange-800'
    },
    {
        id: 'e2',
        category: '기초탐색',
        title: '데이터 리터러시 MD',
        description: '데이터를 읽고, 해석하고, 비판적으로 분석하여 의사결정에 활용하는 필수 데이터 소양을 기릅니다.',
        completedCount: 180,
        takingCount: 62,
        tags: ['데이터해석', '엑셀/통계', '필수역량'],
        colorClass: 'bg-orange-100 text-orange-800'
    },
    {
        id: 'e3',
        category: '진로탐색',
        title: '창업가 정신과 스타트업 MD',
        description: '실제 스타트업 사례를 분석하고 모의 창업 프로젝트를 통해 기업가 정신과 도전적인 마인드셋을 함양합니다.',
        completedCount: 145,
        takingCount: 50,
        tags: ['창업', '도전', '프로젝트'],
        colorClass: 'bg-yellow-100 text-yellow-800'
    },
    {
        id: 'e4',
        category: '진로탐색',
        title: '미래 진로 설계 MD',
        description: '자기 이해를 바탕으로 구체적인 진로 로드맵을 수립하고, 다양한 직무를 탐색해보는 진로 가이드 과정입니다.',
        completedCount: 160,
        takingCount: 55,
        tags: ['진로설정', '직무탐색', '자기개발'],
        colorClass: 'bg-green-100 text-green-800'
    },
    {
        id: 'e5',
        category: '소양함양',
        title: '디지털 인문학 MD',
        description: '인문학적 상상력과 디지털 기술을 융합하여 새로운 시각으로 세상을 바라보는 통찰력을 기릅니다.',
        completedCount: 95,
        takingCount: 28,
        tags: ['인문학', '통찰력', '융합사고'],
        colorClass: 'bg-gray-100 text-gray-800'
    }
];

const ModuleCard: React.FC<{ module: ModuleItem; index: number; onClick: () => void }> = ({ module, index, onClick }) => (
    <div 
        onClick={onClick}
        className="border rounded-lg p-5 hover:shadow-md transition cursor-pointer flex flex-col h-full bg-white relative overflow-hidden group"
    >
        {index < 3 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-10">
                TOP {index + 1}
            </div>
        )}
        <div className="flex items-start justify-between mb-3">
            <span className={`${module.colorClass} text-xs px-2.5 py-1 rounded-full font-semibold`}>
                {module.category}
            </span>
        </div>
        <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{module.title}</h4>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{module.description}</p>
        
        <div className="flex flex-wrap gap-1.5 mb-4">
            {module.tags.map(tag => (
                <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded border border-gray-200">#{tag}</span>
            ))}
        </div>

        <div className="pt-3 border-t flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                    이수 {module.completedCount}명
                </span>
            </div>
            <div className="flex items-center gap-1">
                <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                    이수중 {module.takingCount}명
                </span>
            </div>
        </div>
    </div>
);

const ModuleExplorationView: React.FC = () => {
    const [tab, setTab] = useState<'dept' | 'conv' | 'exp'>('dept');
    const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<SubjectProfile | null>(null);
    const [selectedInterview, setSelectedInterview] = useState<InterviewData | null>(null);
    const [isAdded, setIsAdded] = useState(false);

    const handleModuleClick = (module: ModuleItem) => {
        setSelectedModule(generateDetail(module));
        setIsAdded(false);
    };

    const handleSubjectClick = (subjectName: string) => {
        // Fallback generator for subjects
        const profile = SUBJECT_PROFILES[subjectName] || {
            name: subjectName,
            overview: `${subjectName} 교과목에 대한 개요 정보입니다. 해당 과목은 ${selectedModule?.title || '본 모듈'}의 핵심 역량을 다룹니다.`,
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

    const handleAddToCurriculum = () => {
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-fade-in relative">
            <h2 className="text-3xl font-bold mb-1">모듈 탐색</h2>
            <p className="text-gray-600">우리 학교의 다양한 전공 및 융합 모듈을 탐색해보세요.</p>

            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex space-x-4 border-b mb-6 overflow-x-auto">
                    <button onClick={() => setTab('dept')} className={`pb-2 px-4 font-semibold focus:outline-none whitespace-nowrap ${tab === 'dept' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>학과별 대표 모듈</button>
                    <button onClick={() => setTab('conv')} className={`pb-2 px-4 font-semibold focus:outline-none whitespace-nowrap ${tab === 'conv' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>융합 모듈</button>
                    <button onClick={() => setTab('exp')} className={`pb-2 px-4 font-semibold focus:outline-none whitespace-nowrap ${tab === 'exp' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>탐색 모듈</button>
                </div>

                {tab === 'dept' && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">학생들이 가장 많이 선택한 학과별 대표 모듈입니다.</p>
                            <select className="text-sm border rounded-md p-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>신청순</option>
                                <option>만족도순</option>
                                <option>최신순</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {DEPT_MODULES.map((module, index) => (
                                <ModuleCard key={module.id} module={module} index={index} onClick={() => handleModuleClick(module)} />
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'conv' && (
                    <div className="animate-fade-in">
                         <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">여러 학문의 경계를 넘나드는 융합형 인재를 위한 모듈입니다.</p>
                            <select className="text-sm border rounded-md p-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>인기순</option>
                                <option>최신순</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {CONV_MODULES.map((module, index) => (
                                <ModuleCard key={module.id} module={module} index={index} onClick={() => handleModuleClick(module)} />
                            ))}
                        </div>
                    </div>
                )}

                 {tab === 'exp' && (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-sm text-gray-500">전공 진입 전, 다양한 분야를 미리 경험해볼 수 있는 기초 모듈입니다.</p>
                            <select className="text-sm border rounded-md p-1.5 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option>추천순</option>
                                <option>인기순</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {EXP_MODULES.map((module, index) => (
                                <ModuleCard key={module.id} module={module} index={index} onClick={() => handleModuleClick(module)} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Detailed Overlay Modal (Level 1) */}
            {selectedModule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative flex flex-col">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                            <div className="flex items-center gap-3">
                                <span className={`${selectedModule.colorClass} text-xs px-2.5 py-1 rounded-full font-bold`}>
                                    {selectedModule.category}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900">{selectedModule.title}</h3>
                            </div>
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
                                                📈 산업 동향 분석
                                            </span>
                                            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-100 leading-relaxed">
                                                {selectedModule.industryTrend}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="font-bold text-green-600 flex items-center gap-1">
                                                💼 채용 계획 및 전망
                                            </span>
                                            <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-100 leading-relaxed">
                                                {selectedModule.hiringPlan}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <span className="font-bold text-gray-700 block mb-1">💡 추천 이유</span>
                                            <p className="text-gray-600 leading-relaxed">{selectedModule.reason}</p>
                                        </div>
                                        <div className="pt-3 border-t mt-3">
                                            <span className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-wide">구성 교과목 (클릭하여 상세 정보 확인)</span>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedModule.subjects.map((sub, i) => (
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
                                </div>

                                {/* Employment & Interview Section */}
                                {selectedModule.interviews && selectedModule.interviews.length > 0 && (
                                    <div className="bg-white border rounded-xl p-6 shadow-sm mt-2">
                                        <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                                            🎓 졸업생 취업 현황 및 인터뷰
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedModule.interviews.map((interview) => (
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
                        </div>
                        
                        {/* Footer Actions */}
                        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-between items-center">
                            <div className="flex gap-2">
                                {selectedModule.tags.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded border">#{tag}</span>
                                ))}
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setSelectedModule(null)}
                                    className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                                >
                                    닫기
                                </button>
                                <button 
                                    onClick={handleAddToCurriculum}
                                    disabled={isAdded}
                                    className={`px-5 py-2.5 text-white rounded-lg transition-all font-medium text-sm flex items-center gap-2 ${isAdded ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {isAdded ? (
                                        <>
                                            <CheckIcon className="w-4 h-4" />
                                            설계 모듈에 담기 완료!
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon className="w-4 h-4" />
                                            교육과정 설계에 담기
                                        </>
                                    )}
                                </button>
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

            {/* Interview Detail Modal (Level 2) */}
            {selectedInterview && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
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
                                    <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                                        <h5 className="flex items-center gap-2 font-bold text-blue-600 mb-3">
                                            📌 주요 담당 직무 : {selectedInterview.companyRole}
                                        </h5>
                                        <p className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-50">
                                            {selectedInterview.jobDuty}
                                        </p>
                                    </div>

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
        </div>
    );
};

export default ModuleExplorationView;

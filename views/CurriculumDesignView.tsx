
import React, { useState, useEffect } from 'react';
import { Subject, Track } from '../types';
import { PlusIcon, XIcon, CheckIcon } from '../components/Icons';

// Completed Major Subjects (Mock Data matching Learning History)
const COMPLETED_MAJOR_SUBJECTS: Subject[] = [
    { id: 'cm1', name: 'SW개론', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm2', name: '파이썬프로그래밍', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm3', name: '이산수학', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm4', name: 'AI 입문', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm5', name: '프로그래밍 기초', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm6', name: '데이터베이스', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm7', name: '컴퓨터 구조', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm8', name: '자료구조', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm9', name: '알고리즘', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm10', name: '운영체제', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm11', name: '객체지향프로그래밍', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm12', name: '머신러닝', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm13', name: '웹 프로그래밍', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm14', name: '소프트웨어 공학', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'cm15', name: '네트워크', credit: 3, type: 'major', dept: '컴퓨터공학과' },
];

// Expanded Mock Data based on HTML prototype
const LIBRARY_SUBJECTS: Subject[] = [
    // Major
    { id: 'm1', name: '발달과 건강지원', credit: 3, type: 'major', dept: '유아교육과' },
    { id: 'm2', name: '영유아발달', credit: 3, type: 'major', dept: '유아교육과' },
    { id: 'm3', name: '기악1', credit: 3, type: 'major', dept: '유아교육과' },
    { id: 'm4', name: '유아교육론', credit: 3, type: 'major', dept: '유아교육과' },
    { id: 'm5', name: '유아미래소양 교육론', credit: 3, type: 'major', dept: '유아교육과' },
    { id: 'm6', name: '자료구조', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'm7', name: '알고리즘', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'm8', name: '운영체제', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'm9', name: '객체지향프로그래밍', credit: 3, type: 'major', dept: '컴퓨터공학과' },
    { id: 'm10', name: '데이터 기반 마케팅', credit: 3, type: 'major', dept: '경영학과' },

    // General
    { id: 'g1', name: 'SW와컴퓨팅적사고', credit: 3, type: 'general', dept: '학부교양대학' },
    { id: 'g2', name: '인생설계를위한기업가정신', credit: 3, type: 'general', dept: '학부교양대학' },
    { id: 'g3', name: '비판적사고와읽기', credit: 3, type: 'general', dept: '학부교양대학' },
    { id: 'g4', name: '인문학의이해', credit: 3, type: 'general', dept: '학부교양대학' },
    { id: 'g5', name: '대학생을위한지속가능발전과ESG', credit: 3, type: 'general', dept: '학부교양대학' },

    // Extra
    { id: 'e1', name: '자기설계교과', credit: 3, type: 'extra', dept: '교육혁신센터' },
    { id: 'e2', name: '040(공부사랑공동체)', credit: 0, type: 'extra', dept: 'CTL' },
    { id: 'e3', name: '글쓰기클리닉', credit: 0, type: 'extra', dept: '학부교양대학' },
    { id: 'e4', name: '취업캠프', credit: 0, type: 'extra', dept: '취업지원센터' },
    { id: 'e5', name: '기업탐방', credit: 0, type: 'extra', dept: '취업지원센터' },
    { id: 'e6', name: '진로디자인캠프', credit: 0, type: 'extra', dept: '취업지원센터' },
    { id: 'e7', name: '성격 및 진로유형 검사', credit: 0, type: 'extra', dept: '학생상담센터' },
];

// Theme Configuration for different degree types
const THEME_CONFIG: Record<string, { 
    color: string, 
    label: string, 
    desc: string,
    styles: {
        bg: string,
        border: string,
        text: string,
        button: string,
        badge: string,
        ring: string,
        accentBorder: string
    }
}> = {
    self_module: { 
        color: 'blue', 
        label: '자기설계모듈', 
        desc: '자유롭게 모듈을 조합하여 나만의 커리큘럼을 설계합니다.',
        styles: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700',
            badge: 'bg-blue-100 text-blue-700',
            ring: 'ring-blue-500',
            accentBorder: 'border-blue-500'
        }
    },
    double: { 
        color: 'purple', 
        label: '복수전공', 
        desc: '제1전공과 함께 타 전공 학위를 취득하기 위한 36학점 설계 과정입니다.',
        styles: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-600',
            button: 'bg-purple-600 hover:bg-purple-700',
            badge: 'bg-purple-100 text-purple-700',
            ring: 'ring-purple-500',
            accentBorder: 'border-purple-500'
        }
    },
    minor: { 
        color: 'green', 
        label: '부전공', 
        desc: '타 전공의 핵심 교과목 21학점 이상을 이수하여 부전공을 취득합니다.',
        styles: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-600',
            button: 'bg-green-600 hover:bg-green-700',
            badge: 'bg-green-100 text-green-700',
            ring: 'ring-green-500',
            accentBorder: 'border-green-500'
        }
    },
    self_major: { 
        color: 'indigo', 
        label: '자기설계전공', 
        desc: '기존에 없던 새로운 전공 명칭과 학위를 스스로 설계하는 융합 과정입니다.',
        styles: {
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            text: 'text-indigo-600',
            button: 'bg-indigo-600 hover:bg-indigo-700',
            badge: 'bg-indigo-100 text-indigo-700',
            ring: 'ring-indigo-500',
            accentBorder: 'border-indigo-500'
        }
    }
};

const CurriculumDesignView: React.FC = () => {
    // Initial Tracks
    const [tracks, setTracks] = useState<Track[]>([
        { id: 1, title: '나의 설계모듈 1 (모듈명 미정)', subjects: [] },
        { id: 2, title: '나의 설계모듈 2 (모듈명 미정)', subjects: [] },
    ]);
    const [selectedTrackId, setSelectedTrackId] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<'major' | 'general' | 'extra'>('major');
    const [searchTerm, setSearchTerm] = useState('');
    const [degreeType, setDegreeType] = useState('self_module');
    const [planName, setPlanName] = useState('나의 커리큘럼 1');
    const [addedFeedback, setAddedFeedback] = useState<Record<string, boolean>>({});

    const currentTheme = THEME_CONFIG[degreeType];

    // Calculate total credits
    const totalCredits = tracks.reduce((acc, track) => acc + track.subjects.reduce((sum, s) => sum + s.credit, 0), 0);

    // Heuristic for naming based on HTML prototype
    const getRecommendedName = (subjects: Subject[]) => {
        const subText = subjects.map(s => s.name).join(' ');
        if (subjects.length === 0) return "모듈명 미정";
        if (/유아|아동|발달|기악/.test(subText)) return "유아 미래 교육";
        if (/자료구조|알고리즘|AI|소프트웨어|컴퓨터|머신러닝|객체/.test(subText)) return "지능형 SW 개발";
        if (/웹|네트워크|서버/.test(subText)) return "웹/클라우드 전문가";
        if (/마케팅|경영|비즈니스|기업/.test(subText)) return "데이터 비즈니스 융합";
        if (/창업|스타트업|기업가/.test(subText)) return "청년 창업 벤처";
        if (/진로|취업|상담|심리/.test(subText)) return "진로 심리 상담";
        if (/글쓰기|인문|사고|철학/.test(subText)) return "창의 인문 소양";
        return "융합 설계 모듈";
    };

    // Update track titles whenever subjects or degreeType changes
    useEffect(() => {
        setTracks(prev => prev.map((t, idx) => {
            let prefix = `나의 설계모듈 ${idx + 1}`;
            
            if (degreeType === 'double') {
                if (idx === 0) prefix = "제1전공 (본전공)";
                else if (idx === 1) prefix = "제2전공 (복수전공)";
                else prefix = `추가 모듈 ${idx - 1}`;
            } else if (degreeType === 'minor') {
                if (idx === 0) prefix = "제1전공 (본전공)";
                else if (idx === 1) prefix = "제2전공 (부전공)";
                else prefix = `추가 모듈 ${idx - 1}`;
            } else if (degreeType === 'self_major') {
                if (idx === 0) prefix = "융합 전공 핵심";
                else prefix = "융합 전공 심화";
            }

            // Don't auto-rename if it's the primary major track in double/minor modes
            if ((degreeType === 'double' || degreeType === 'minor') && idx === 0) {
                return { ...t, title: prefix };
            }

            const recName = getRecommendedName(t.subjects);
            const title = recName !== "모듈명 미정" ? `${prefix} (${recName})` : `${prefix}`;

            return { ...t, title };
        }));
    }, [JSON.stringify(tracks.map(t => t.subjects)), degreeType]); 

    const handleDegreeChange = (type: string) => {
        setDegreeType(type);
        // Reset tracks based on type with predefined slots
        if (type === 'double') {
            setTracks([
                { id: 1, title: '제1전공', subjects: [...COMPLETED_MAJOR_SUBJECTS] },
                { id: 2, title: '복수전공', subjects: [] }
            ]);
        } else if (type === 'minor') {
            setTracks([
                { id: 1, title: '제1전공', subjects: [...COMPLETED_MAJOR_SUBJECTS] },
                { id: 2, title: '부전공', subjects: [] }
            ]);
        } else if (type === 'self_major') {
             setTracks([
                { id: 1, title: '융합 전공 핵심', subjects: [] },
                { id: 2, title: '융합 전공 심화', subjects: [] }
            ]);
        } else {
            // self_module
            setTracks([
                { id: 1, title: '나의 설계모듈 1', subjects: [] },
                { id: 2, title: '나의 설계모듈 2', subjects: [] }
            ]);
        }
        // If switching to double/minor, default select the secondary track (id 2) for easier adding
        if (type === 'double' || type === 'minor') {
            setSelectedTrackId(2);
        } else {
            setSelectedTrackId(1);
        }
    };

    const handleAddSubject = (subject: Subject) => {
        if (!selectedTrackId) {
            alert("과목을 담을 보드(트랙)를 먼저 선택해주세요!");
            return;
        }

        setTracks(prev => prev.map(t => {
            if (t.id === selectedTrackId) {
                 // Avoid duplicates
                 if(t.subjects.find(s => s.id === subject.id)) return t;
                 return { ...t, subjects: [...t.subjects, subject] };
            }
            return t;
        }));

        // Show feedback
        setAddedFeedback(prev => ({ ...prev, [subject.id]: true }));
        setTimeout(() => {
            setAddedFeedback(prev => ({ ...prev, [subject.id]: false }));
        }, 1000);
    };

    const handleRemoveSubject = (trackId: number, subjectId: string) => {
        setTracks(prev => prev.map(t => {
            if (t.id === trackId) {
                return { ...t, subjects: t.subjects.filter(s => s.id !== subjectId) };
            }
            return t;
        }));
    };

    const handleAddTrack = () => {
        const newId = tracks.length > 0 ? Math.max(...tracks.map(t => t.id)) + 1 : 1;
        setTracks(prev => [...prev, { id: newId, title: `추가 모듈 ${newId}`, subjects: [] }]);
        setSelectedTrackId(newId);
        
        setTimeout(() => {
             const el = document.getElementById(`track-container-${newId}`);
             el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleDeleteTrack = (id: number) => {
        if (tracks.length === 1) {
            alert("최소 하나의 모듈은 존재해야 합니다.");
            return;
        }
        if (confirm("정말 이 모듈 보드를 삭제하시겠습니까?")) {
            setTracks(prev => prev.filter(t => t.id !== id));
            if (selectedTrackId === id) {
                setSelectedTrackId(tracks.find(t => t.id !== id)?.id || 0);
            }
        }
    };

    const handleReset = () => {
        if(confirm('모든 설계 내용을 초기화 하시겠습니까?')) {
            handleDegreeChange(degreeType); // Reset to default state of current degree type
        }
    };

    const handleSave = () => {
        alert(`[${planName}] 교육과정 설계가 저장되었습니다.\n마이페이지 > 보관함에서 확인하실 수 있습니다.`);
    }

    const filteredSubjects = LIBRARY_SUBJECTS.filter(s => 
        s.type === activeTab && s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in h-full flex flex-col">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                    <h2 className="text-3xl font-bold mb-1">나의 모듈 설계</h2>
                    <p className="text-gray-600">학교의 다양한 모듈을 조합하여 본전공, 복수전공, 부전공을 스스로 설계해보세요.</p>
                </div>
                <div className="w-full md:w-auto">
                    <label className="block text-xs font-semibold text-gray-500 mb-1">설계 명칭 (Plan Name)</label>
                    <input 
                        type="text" 
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        className={`w-full md:w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 font-medium text-gray-700 ${currentTheme.styles.border} focus:${currentTheme.styles.ring}`}
                    />
                </div>
            </div>

            {/* 1. Goal Setting */}
            <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 ${currentTheme.styles.accentBorder}`}>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm ${currentTheme.styles.badge}`}>1</span>
                    이수 목표 설정
                </h3>
                <div className="flex flex-wrap gap-6 mb-4">
                    {Object.keys(THEME_CONFIG).map(key => {
                        const config = THEME_CONFIG[key];
                        return (
                            <label key={key} className="flex items-center gap-2 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${degreeType === key ? `border-${config.color}-600 bg-${config.color}-600` : 'border-gray-300'}`}>
                                    {degreeType === key && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <input 
                                    type="radio" 
                                    name="degreeType" 
                                    value={key} 
                                    checked={degreeType === key}
                                    onChange={() => handleDegreeChange(key)}
                                    className="hidden" 
                                />
                                <span className={`${degreeType === key ? `text-${config.color}-700 font-bold` : 'text-gray-600'}`}>{config.label}</span>
                            </label>
                        )
                    })}
                </div>
                <p className={`text-sm p-3 rounded-lg ${currentTheme.styles.bg} ${currentTheme.styles.text}`}>
                    💡 {currentTheme.desc}
                </p>
            </div>

            {/* 2. Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-[600px]">
                
                {/* Left: Library (2/5) */}
                <div className={`lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col border ${currentTheme.styles.border} h-[600px]`}>
                    <div className={`p-4 border-b ${currentTheme.styles.bg} ${currentTheme.styles.border}`}>
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-sm">2</span>
                            교과목 라이브러리
                        </h3>
                        <input 
                            type="text" 
                            placeholder="과목명, 학과명 검색..." 
                            className={`w-full border rounded-lg px-4 py-2 text-sm mb-4 focus:outline-none focus:ring-1 transition-all ${currentTheme.styles.border} focus:${currentTheme.styles.ring}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className={`flex text-sm border-b ${currentTheme.styles.border}`}>
                            {[
                                { id: 'major', label: '전공', color: 'blue' },
                                { id: 'general', label: '교양', color: 'green' },
                                { id: 'extra', label: '비교과', color: 'purple' }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex-1 pb-3 font-semibold focus:outline-none transition-all relative ${
                                        activeTab === tab.id 
                                        ? `text-${tab.color}-600` 
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-${tab.color}-600 rounded-t-full`}></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                        {filteredSubjects.map(subject => {
                            const isAdded = addedFeedback[subject.id];
                            
                            // Dynamic button styles based on current theme
                            let btnStyle = `border ${currentTheme.styles.text} ${currentTheme.styles.border} hover:${currentTheme.styles.bg}`;
                            
                            return (
                                <div key={subject.id} className={`border rounded-lg p-3 hover:shadow-sm transition-all flex justify-between items-center group ${isAdded ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-100'}`}>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800 mb-0.5">{subject.name}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium bg-gray-100 text-gray-600`}>{subject.dept}</span>
                                            {subject.credit > 0 && <span className="text-xs text-gray-500">{subject.credit}학점</span>}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleAddSubject(subject)}
                                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1 ${
                                            isAdded 
                                            ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-default' 
                                            : btnStyle
                                        }`}
                                        disabled={isAdded}
                                    >
                                        {isAdded ? (
                                            <>✔ 완료</>
                                        ) : (
                                            <>+ 추가</>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                        {filteredSubjects.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                                <p className="text-sm">검색 결과가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Board (3/5) */}
                <div className={`lg:col-span-3 bg-white rounded-lg shadow-sm flex flex-col border ${currentTheme.styles.border} h-[600px]`}>
                    <div className={`p-4 border-b flex justify-between items-center ${currentTheme.styles.bg} ${currentTheme.styles.border}`}>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-gray-200 text-gray-700 w-6 h-6 flex items-center justify-center rounded-full text-sm">3</span>
                            나의 설계 현황
                        </h3>
                        <div className="bg-white px-3 py-1.5 rounded-full border shadow-sm">
                            <span className="text-xs text-gray-500 mr-2">총 예상 학점</span>
                            <span className={`font-bold text-lg ${currentTheme.styles.text}`}>{totalCredits} <span className="text-sm font-normal text-gray-500">학점</span></span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 custom-scrollbar">
                        {tracks.map((track, idx) => {
                            const isSelected = track.id === selectedTrackId;
                            // Track color logic adapted to theme
                            let accentColor = isSelected ? currentTheme.styles.accentBorder : 'border-gray-200';
                            let ringClass = isSelected ? `ring-4 ${currentTheme.styles.ring} ring-opacity-20` : '';
                            
                            const trackCredits = track.subjects.reduce((sum, s) => sum + s.credit, 0);
                            let progressInfo = null;

                            // Show progress for 2nd major in Double/Minor modes
                            if ((degreeType === 'double' || degreeType === 'minor') && idx === 1) {
                                const target = degreeType === 'double' ? 36 : 24;
                                const percent = Math.min((trackCredits / target) * 100, 100);
                                progressInfo = (
                                    <div className="mt-1 w-full">
                                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                                            <span>이수 {trackCredits} / 목표 {target} 학점</span>
                                            <span>{Math.round(percent)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                                className={`h-1.5 rounded-full ${trackCredits >= target ? 'bg-green-500' : 'bg-blue-500'}`} 
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div 
                                    id={`track-container-${track.id}`}
                                    key={track.id}
                                    onClick={() => setSelectedTrackId(track.id)}
                                    className={`relative cursor-pointer transition-all duration-200 rounded-xl border-2 bg-white ${accentColor} ${ringClass} ${
                                        !isSelected ? 'shadow hover:shadow-md hover:border-gray-300' : 'shadow-lg scale-[1.01]'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className={`absolute -top-3 -left-2 text-white text-[11px] px-3 py-1 rounded-full shadow-md z-10 font-bold tracking-wide ${currentTheme.styles.button}`}>
                                            현재 선택된 보드
                                        </div>
                                    )}
                                    
                                    {/* Delete Button */}
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteTrack(track.id); }}
                                        className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-20 group"
                                        title="보드 삭제"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>

                                    <div className="px-5 pt-5 pb-2">
                                        <h4 className={`text-base font-bold mb-1 flex items-center ${currentTheme.styles.text}`}>
                                            {track.title}
                                        </h4>
                                        <div className="text-xs text-gray-400">
                                            {track.subjects.length}개 과목 • {trackCredits}학점
                                        </div>
                                        {progressInfo}
                                    </div>
                                    
                                    <div className="p-4 pt-2">
                                        <div className="flex flex-wrap gap-2 min-h-[60px]">
                                            {track.subjects.map(sub => (
                                                <div key={`${track.id}-${sub.id}`} className="bg-white border border-gray-200 rounded-lg pl-3 pr-2 py-2 flex items-center shadow-sm hover:border-blue-300 transition-colors group">
                                                    <div className="mr-2">
                                                        <p className="text-xs font-bold text-gray-800">{sub.name}</p>
                                                        <p className="text-[10px] text-gray-500">{sub.credit}학점</p>
                                                    </div>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); handleRemoveSubject(track.id, sub.id); }}
                                                        className="text-gray-300 hover:text-red-500 p-1 hover:bg-red-50 rounded"
                                                    >
                                                        <XIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            ))}
                                            
                                            {track.subjects.length === 0 && (
                                                <div className={`w-full h-20 border-2 border-dashed rounded-lg flex items-center justify-center text-sm transition-colors ${isSelected ? `${currentTheme.styles.border} ${currentTheme.styles.bg} ${currentTheme.styles.text}` : 'border-gray-200 text-gray-400'}`}>
                                                    {isSelected ? "+ 왼쪽 라이브러리에서 과목을 추가하세요" : "과목을 담으려면 이 보드를 클릭하세요"}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <button 
                            onClick={handleAddTrack}
                            className={`w-full mt-4 border-2 border-dashed rounded-xl p-4 transition-all flex items-center justify-center gap-2 font-bold ${currentTheme.styles.border} ${currentTheme.styles.text} hover:${currentTheme.styles.bg}`}
                        >
                            <PlusIcon className="w-5 h-5" />
                            + 새 설계 모듈(트랙) 추가
                        </button>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className={`p-4 border-t flex justify-end gap-3 ${currentTheme.styles.bg} ${currentTheme.styles.border}`}>
                        <button 
                            onClick={handleReset}
                            className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                        >
                            초기화
                        </button>
                        <button 
                            onClick={handleSave}
                            className={`px-6 py-2.5 text-white rounded-lg shadow-sm transition-all font-bold text-sm flex items-center gap-2 ${currentTheme.styles.button}`}
                        >
                            <CheckIcon className="w-4 h-4" />
                            설계 저장하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurriculumDesignView;

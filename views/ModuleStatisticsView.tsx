
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import { XIcon } from '../components/Icons';

// --- Mock Data ---

// 1. Module GPA Growth Trend Data
const gpaData = [
  { semester: '1-1', aisw: 3.2, bigdata: 3.1, factory: 3.0, marketing: 3.5 },
  { semester: '1-2', aisw: 3.4, bigdata: 3.3, factory: 3.2, marketing: 3.6 },
  { semester: '2-1', aisw: 3.6, bigdata: 3.5, factory: 3.4, marketing: 3.7 },
  { semester: '2-2', aisw: 3.8, bigdata: 3.6, factory: 3.5, marketing: 3.8 },
  { semester: '3-1', aisw: 3.9, bigdata: 3.8, factory: 3.7, marketing: 3.85 },
];

// 2. Core Competency Comparison Data
const radarData = [
  { subject: '이론지식', aisw: 100, bigdata: 90, fullMark: 100 },
  { subject: '실무구현', aisw: 85, bigdata: 80, fullMark: 100 },
  { subject: '문제해결', aisw: 90, bigdata: 85, fullMark: 100 },
  { subject: '의사소통', aisw: 70, bigdata: 75, fullMark: 100 },
  { subject: '창의성', aisw: 80, bigdata: 85, fullMark: 100 },
];

// 3. Student Distribution Data
const barData = [
  { name: 'AI-SW', students: 18, fill: '#2563EB' },
  { name: '빅데이터', students: 12, fill: '#8B5CF6' },
  { name: '마케팅', students: 8, fill: '#F59E0B' },
  { name: '팩토리', students: 5, fill: '#10B981' },
];

// 4. Detailed Metrics Table Data
const tableData = [
  { name: 'AI-SW MD', students: 18, gpa: '3.9 / 4.5', completion: '72%', employment: '85%', key: 'aisw' },
  { name: '빅데이터 경영', students: 12, gpa: '3.8 / 4.5', completion: '65%', employment: '80%', key: 'bigdata' },
  { name: '디지털마케팅', students: 5, gpa: '3.8 / 4.5', completion: '78%', employment: '75%', key: 'marketing' },
];

// Interview Data Interface
interface InterviewData {
    id: string;
    moduleName: string;
    studentName: string;
    studentId: string;
    companyName: string;
    companyRole: string;
    location: string; // Region (e.g., 서울, 부산)
    industry: string;
    product: string;
    jobDuty: string;
    question: string;
    answer: string;
    avatarChar: string;
    avatarColor: string;
}

const EMPLOYMENT_DATA: Record<string, InterviewData[]> = {
    'aisw': [
        {
            id: 'ai1',
            moduleName: 'AI-SW MD',
            studentName: '김태영',
            studentId: '20182233 졸업',
            companyName: '네이버 (Naver)',
            companyRole: 'AI Search Engineer',
            location: '경기 성남',
            industry: 'IT 플랫폼 / 인터넷 서비스',
            product: '네이버 검색, 클로바 AI',
            jobDuty: '대규모 검색 모델 최적화 및 자연어 이해(NLU) 연구',
            question: '모듈 이수가 취업에 어떤 도움이 되었나요?',
            answer: '"AI-SW 모듈의 \'자연어 처리 심화\' 수업에서 진행했던 챗봇 프로젝트가 실제 입사 면접에서 큰 도움이 되었습니다. 이론뿐만 아니라 실제 파이프라인을 구축해본 경험이 실무 적응에 결정적이었습니다."',
            avatarChar: '👨‍💻',
            avatarColor: 'bg-purple-100'
        },
        {
            id: 'ai2',
            moduleName: 'AI-SW MD',
            studentName: '이소연',
            studentId: '20190123 졸업',
            companyName: 'BNK 부산은행',
            companyRole: '디지털 금융 개발자',
            location: '부산 남구',
            industry: '금융 / 핀테크',
            product: '모바일 뱅킹 앱, 금융 서비스',
            jobDuty: '모바일 뱅킹 앱 백엔드 개발 및 금융 데이터 보안 관리',
            question: '부산 지역 기업 취업에 모듈이 도움이 되었나요?',
            answer: '"부산은행 디지털 직군 채용 시 \'웹 풀스택\'과 \'보안\' 관련 교과목 이수 내역을 높게 평가받았습니다. 특히 지역 산학 협력 프로젝트 경험이 큰 가점이 되었습니다."',
            avatarChar: '👩‍💼',
            avatarColor: 'bg-blue-100'
        },
        {
            id: 'ai3',
            moduleName: 'AI-SW MD',
            studentName: '박준형',
            studentId: '20201122 졸업',
            companyName: '모두싸인',
            companyRole: 'Frontend Developer',
            location: '부산 해운대구',
            industry: 'SaaS / 리걸테크',
            product: '전자계약 솔루션',
            jobDuty: '전자계약 웹 서비스 프론트엔드 기능 구현 및 성능 최적화',
            question: '스타트업 취업을 준비하는 후배들에게 한마디?',
            answer: '"모듈 수업에서 다룬 리액트(React) 실습과 팀 프로젝트 경험이 실무와 거의 동일했습니다. 부산의 유망한 유니콘 기업에서 성장하고 싶다면 꼭 이수하세요!"',
            avatarChar: '👨‍🎨',
            avatarColor: 'bg-yellow-100'
        }
    ],
    'bigdata': [
        {
            id: 'bd1',
            moduleName: '빅데이터 경영 MD',
            studentName: '이지은',
            studentId: '20191122 졸업',
            companyName: '카카오뱅크',
            companyRole: 'Data Analyst',
            location: '경기 성남',
            industry: '인터넷 전문은행',
            product: '신용평가 모델, 고객 분석',
            jobDuty: '고객 행동 로그 분석 및 신용 평가 모델링 고도화',
            question: '모듈 이수가 취업에 어떤 도움이 되었나요?',
            answer: '"빅데이터 경영 모듈에서 다룬 SQL과 데이터 시각화 프로젝트 덕분에 실무 면접 과제를 수월하게 해결할 수 있었습니다. 특히 비즈니스 관점에서 데이터를 해석하는 능력을 길러준 것이 큰 장점이었습니다."',
            avatarChar: '👩‍🔬',
            avatarColor: 'bg-blue-200'
        },
        {
            id: 'bd2',
            moduleName: '빅데이터 경영 MD',
            studentName: '최진우',
            studentId: '20185566 졸업',
            companyName: '팬스타라인닷컴',
            companyRole: '물류 데이터 관리',
            location: '부산 중구',
            industry: '해운 / 물류',
            product: '국제 여객 및 화물 운송',
            jobDuty: '화물 운송 데이터 분석 및 물류 프로세스 최적화',
            question: '지역 우수 기업 취업 노하우가 있다면?',
            answer: '"부산의 핵심 산업인 물류 데이터를 다룰 줄 아는 것이 경쟁력입니다. 모듈 수업 중 \'SCM과 데이터 분석\' 과목이 실무 면접에서 결정적인 역할을 했습니다."',
            avatarChar: '👨‍✈️',
            avatarColor: 'bg-cyan-100'
        }
    ],
    'marketing': [
        {
            id: 'mk1',
            moduleName: '디지털마케팅 MD',
            studentName: '박준호',
            studentId: '20205511 졸업',
            companyName: '우아한형제들',
            companyRole: 'Performance Marketer',
            location: '서울 송파구',
            industry: 'O2O 플랫폼 / 푸드테크',
            product: '배달의민족 앱 마케팅',
            jobDuty: '퍼포먼스 마케팅 캠페인 기획 및 ROAS 성과 분석',
            question: '모듈 이수가 취업에 어떤 도움이 되었나요?',
            answer: '"디지털 마케팅 모듈의 GA4 실습과 광고 집행 프로젝트 경험이 포트폴리오의 핵심이 되었습니다. 실제 데이터를 기반으로 마케팅 전략을 수립해본 경험이 현업에서 바로 활용되고 있습니다."',
            avatarChar: '👨‍🎤',
            avatarColor: 'bg-orange-200'
        }
    ]
};

const ModuleStatisticsView: React.FC = () => {
  const [selectedModuleKey, setSelectedModuleKey] = useState<string | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleOpenList = (key: string) => {
      setSelectedModuleKey(key);
      setSelectedStudentId(null);
  };

  const handleSelectStudent = (id: string) => {
      setSelectedStudentId(id);
  };

  const handleCloseModal = () => {
      setSelectedModuleKey(null);
      setSelectedStudentId(null);
  };

  const handleBackToList = () => {
      setSelectedStudentId(null);
  }

  // Get current data context
  const currentStudentList = selectedModuleKey ? EMPLOYMENT_DATA[selectedModuleKey] : [];
  const selectedStudent = selectedStudentId && currentStudentList 
      ? currentStudentList.find(s => s.id === selectedStudentId) 
      : null;

  return (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold mb-1">모듈 분석 통계</h2>
        <p className="text-gray-600 mb-8">나의 모듈 이수 현황과 성장 추이를 시각적으로 분석합니다.</p>

        {/* Top Row: GPA Trend & Radar Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* GPA Trend */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    모듈별 GPA 성장 추이
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={gpaData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis dataKey="semester" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                            <YAxis domain={[2.5, 4.5]} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Line type="monotone" name="AI-SW" dataKey="aisw" stroke="#2563EB" strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: '#2563EB' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" name="BigData" dataKey="bigdata" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: '#8B5CF6' }} />
                            <Line type="monotone" name="Factory" dataKey="factory" stroke="#10B981" strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: '#10B981' }} />
                            <Line type="monotone" name="Marketing" dataKey="marketing" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4, strokeWidth: 0, fill: '#F59E0B' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Radar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    모듈별 핵심 역량 비교
                </h3>
                <div className="h-64 flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar name="AI-SW" dataKey="aisw" stroke="#2563EB" fill="#2563EB" fillOpacity={0.4} />
                            <Radar name="빅데이터" dataKey="bigdata" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.4} />
                            <Legend />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>

        {/* Bottom Row: Bar Chart & Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Student Count Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-1">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
                    <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    모듈별 수강생 분포
                </h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={barData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" width={60} tick={{fill: '#4b5563', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} />
                            <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                            <Bar dataKey="students" radius={[0, 4, 4, 0]} barSize={24}>
                                {barData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
                <h3 className="text-lg font-bold mb-2 text-gray-800">모듈별 상세 지표</h3>
                <p className="text-xs text-gray-500 mb-6">* '취업 연계율'을 클릭하면 취업자 인터뷰를 확인할 수 있습니다.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">모듈명</th>
                                <th className="px-6 py-4 font-semibold text-center">수강생</th>
                                <th className="px-6 py-4 font-semibold text-center">평균 평점</th>
                                <th className="px-6 py-4 font-semibold text-center">이수율</th>
                                <th className="px-6 py-4 font-semibold text-right">취업 연계율</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {tableData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-800">{row.name}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{row.students}명</td>
                                    <td className="px-6 py-4 text-center text-blue-600 font-medium">{row.gpa}</td>
                                    <td className="px-6 py-4 text-center text-gray-600">{row.completion}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleOpenList(row.key)}
                                            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs transition-colors font-medium border border-gray-200"
                                        >
                                            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                            {row.employment}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Modal Overlay */}
        {selectedModuleKey && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden relative flex flex-col max-h-[90vh]">
                    
                    {/* --- LEVEL 1: LIST VIEW --- */}
                    {!selectedStudent && (
                        <>
                            <div className="px-8 py-5 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        🎓 취업 현황 및 졸업생 리스트
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        해당 모듈을 이수하고 취업에 성공한 선배들의 현황입니다. 카드를 클릭하여 인터뷰를 확인하세요.
                                    </p>
                                </div>
                                <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>
                            
                            <div className="p-8 bg-gray-50 overflow-y-auto">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {currentStudentList.map((student) => (
                                        <div 
                                            key={student.id} 
                                            onClick={() => handleSelectStudent(student.id)}
                                            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className={`w-12 h-12 rounded-full ${student.avatarColor} flex items-center justify-center text-2xl shadow-inner`}>
                                                    {student.avatarChar}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{student.studentName}</h4>
                                                    <p className="text-xs text-gray-500">{student.studentId}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-sm border-t pt-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">기업</span>
                                                    <span className="font-semibold text-gray-800">{student.companyName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">지역</span>
                                                    <span className="font-medium text-gray-600 bg-gray-100 px-1.5 rounded text-xs">{student.location}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">직무</span>
                                                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium truncate max-w-[120px]">{student.companyRole}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {currentStudentList.length === 0 && (
                                        <div className="col-span-full text-center py-10 text-gray-500">
                                            등록된 취업자 정보가 없습니다.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* --- LEVEL 2: DETAIL VIEW --- */}
                    {selectedStudent && (
                        <>
                            <div className="px-8 py-5 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={handleBackToList}
                                        className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium transition-colors"
                                    >
                                        ← 리스트로 돌아가기
                                    </button>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{selectedStudent.moduleName}</span>
                                </div>
                                <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
                                    <XIcon className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 bg-gray-50 overflow-y-auto">
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Left: Profile & Company */}
                                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                                        <div className="bg-white rounded-xl border p-6 shadow-sm flex flex-col items-center">
                                            <div className={`w-24 h-24 rounded-full ${selectedStudent.avatarColor} mb-4 flex items-center justify-center shadow-inner`}>
                                                <span className="text-5xl">{selectedStudent.avatarChar}</span>
                                            </div>
                                            <h4 className="font-bold text-xl text-gray-900 mb-1">{selectedStudent.studentName}</h4>
                                            <span className="text-sm text-gray-500 mb-4">{selectedStudent.studentId}</span>
                                            
                                            <div className="w-full pt-4 border-t space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-lg">🏢</div>
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-500">재직 기업</div>
                                                        <div className="font-bold text-blue-800">{selectedStudent.companyName}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-lg">📍</div>
                                                    <div className="flex-1">
                                                        <div className="text-xs text-gray-500">근무지</div>
                                                        <div className="font-medium text-gray-700">{selectedStudent.location}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4 text-sm">
                                            <div>
                                                <h6 className="font-bold text-gray-700 mb-1 flex items-center gap-1">🏭 핵심 산업</h6>
                                                <p className="text-gray-600">{selectedStudent.industry}</p>
                                            </div>
                                            <div>
                                                <h6 className="font-bold text-gray-700 mb-1 flex items-center gap-1">📦 주요 생산품/서비스</h6>
                                                <p className="text-gray-600">{selectedStudent.product}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Job & Interview */}
                                    <div className="w-full md:w-2/3 flex flex-col gap-6">
                                        {/* Job Duty */}
                                        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                                            <h5 className="flex items-center gap-2 font-bold text-blue-600 mb-3">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                주요 담당 직무 : {selectedStudent.companyRole}
                                            </h5>
                                            <p className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-50">
                                                {selectedStudent.jobDuty}
                                            </p>
                                        </div>

                                        {/* Q&A */}
                                        <div className="bg-white border border-orange-100 rounded-xl p-6 shadow-sm flex-1 flex flex-col">
                                            <div className="flex items-start gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-lg flex-shrink-0">Q</div>
                                                <h5 className="font-bold text-lg text-orange-900 pt-0.5">{selectedStudent.question}</h5>
                                            </div>
                                            <div className="relative pl-8 pr-4 py-2 flex-1">
                                                <span className="absolute top-0 left-0 text-5xl text-orange-200 font-serif leading-none">“</span>
                                                <p className="text-gray-700 italic leading-relaxed text-lg">
                                                    {selectedStudent.answer}
                                                </p>
                                                <span className="absolute bottom-0 right-0 text-5xl text-orange-200 font-serif leading-none">”</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Footer */}
                    <div className="px-8 py-3 bg-white border-t text-center">
                        <p className="text-[10px] text-gray-400">* 위 인터뷰는 졸업생의 동의를 얻어 게시되었습니다. 무단 배포를 금합니다.</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default ModuleStatisticsView;

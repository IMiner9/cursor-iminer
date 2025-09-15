
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function IdentitiesPage() {
  const [selectedPrisonerIndex, setSelectedPrisonerIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [identities, setIdentities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const SINNERS: { slug: string; nameKo: string; fileName: string; dirNameEn: string }[] = [
    { slug: "yi-sang", nameKo: "이상", fileName: "이상", dirNameEn: "Yi_Sang" },
    { slug: "faust", nameKo: "파우스트", fileName: "파우스트", dirNameEn: "Faust" },
    { slug: "don-quixote", nameKo: "돈키호테", fileName: "돈키호테", dirNameEn: "Don_Quixote" },
    { slug: "ryoshu", nameKo: "료슈", fileName: "료슈", dirNameEn: "Ryoshu" },
    { slug: "meursault", nameKo: "뫼르소", fileName: "뫼르소", dirNameEn: "Meursault" },
    { slug: "hong-lu", nameKo: "홍루", fileName: "홍루", dirNameEn: "Hong_Lu" },
    { slug: "heathcliff", nameKo: "히스클리프", fileName: "히스클리프", dirNameEn: "Heathcliff" },
    { slug: "ishmael", nameKo: "이스마엘", fileName: "이스마엘", dirNameEn: "Ishmael" },
    { slug: "rodion", nameKo: "로쟈", fileName: "로쟈", dirNameEn: "Rodion" },
    { slug: "sinclair", nameKo: "싱클레어", fileName: "싱클레어", dirNameEn: "Sinclair" },
    { slug: "outis", nameKo: "오티스", fileName: "오티스", dirNameEn: "Outis" },
    { slug: "gregor", nameKo: "그레고르", fileName: "그레고르", dirNameEn: "Gregor" },
  ];

  // DB에서 인격 데이터 가져오기
  useEffect(() => {
    if (selectedPrisonerIndex === null) return;

    async function fetchIdentities() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("identity_selections")
        .select("*")
        .eq("prisoner_name", SINNERS[selectedPrisonerIndex!].nameKo);

      if (error) {
        console.error("Error fetching identities:", error);
        setIdentities([]);
      } else {
        setIdentities(data ?? []);
      }
      setIsLoading(false);
    }

    fetchIdentities();
  }, [selectedPrisonerIndex]);

  // 파일명 변환 함수: DB 인격 이름과 파일명이 동일하므로 그대로 사용
  function toFileBase(identityName: string): string {
    return identityName.trim();
  }

  // 검색 필터링
  const filteredIdentities = useMemo(() => {
    if (!searchQuery.trim()) {
      return identities;
    }
    const query = searchQuery.toLowerCase();
    return identities.filter(identity =>
      identity.identity_name.toLowerCase().includes(query) ||
      identity.grade.toString().includes(query) ||
      identity.core_keyword.toLowerCase().includes(query)
    );
  }, [identities, searchQuery]);

  // 현재 선택된 수감자 폴더명
  const currentSinnerDir = selectedPrisonerIndex !== null ? SINNERS[selectedPrisonerIndex].dirNameEn : null;

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">인격 정보</h1>
      <p className="text-sm text-muted-foreground">12 수감자 아이콘 그리드(2x6) 영역. 아이콘을 클릭하면 아래 인격 레이아웃이 표시됩니다.</p>

      <div className="grid grid-cols-6 gap-3">
        {SINNERS.map((sinner: { slug: string; nameKo: string; fileName: string; dirNameEn: string }, i: number) => (
          <button
            key={sinner.slug}
            type="button"
            onClick={() =>
              setSelectedPrisonerIndex((prev) => (prev === i ? null : i))
            }
            aria-pressed={selectedPrisonerIndex === i}
            className={`aspect-square rounded-md border overflow-hidden transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-none ${
              selectedPrisonerIndex === i
                ? "border-primary/50 ring-1 ring-primary/30"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            title={sinner.nameKo}
          >
            <div className="relative w-full h-full">
              <Image
                src={`/sinners/${sinner.fileName}.png`}
                alt={sinner.nameKo}
                fill
                priority={false}
                sizes="(max-width: 768px) 16vw, (max-width: 1024px) 10vw, 8vw"
                className="object-cover"
              />
            </div>
          </button>
        ))}
      </div>

      {selectedPrisonerIndex !== null && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              선택된 수감자: {SINNERS[selectedPrisonerIndex].nameKo}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="인격 이름, 키워드, 등급으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-3 py-2 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">불러오는 중...</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredIdentities.map((identity, i) => {
                // 인격 이름을 실제 파일명으로 변환 (예: "남부 세븐협회 6과 이상" → "남부세븐6과이상")
                const base = toFileBase(identity.identity_name);
                const dir = currentSinnerDir ?? "Shared";
                
                // 이미지 경로 설정 (PNG 우선 사용)
                const srcPng = `/sinners/${dir}/${base}.png`;
                const srcWebp = `/sinners/${dir}/${base}.webp`;
                const fallback = `/sinners/${dir}/default.png`;
                
                // 디버깅용 콘솔 로그
                console.log(`인격: ${identity.identity_name}`);
                console.log(`파일명: ${base} (DB 이름과 동일)`);
                console.log(`수감자 폴더: ${dir}`);
                console.log(`이미지 경로: ${srcPng}`);
                
                return (
                  <div key={i} className="rounded-md border p-3 hover:shadow-md transition-shadow">
                    <div className="aspect-[4/5] rounded-md bg-gray-100 dark:bg-gray-800 mb-2 overflow-hidden">
                      <img
                        src={srcPng}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (target.src.endsWith(".png")) {
                            target.src = srcWebp;
                          } else {
                            target.src = fallback;
                          }
                        }}
                        alt={identity.identity_name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-sm font-medium">{identity.identity_name}</div>
                    <div className="text-xs text-muted-foreground">등급 {identity.grade}</div>
                    {identity.core_keyword && (
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        {identity.core_keyword}
                      </div>
                    )}
                  </div>
                );
              })}
              {filteredIdentities.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  {searchQuery ? "검색 결과가 없습니다." : "등록된 인격이 없습니다."}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}




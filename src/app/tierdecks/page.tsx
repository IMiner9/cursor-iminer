export default function TierDecksPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">추천 티어덱</h1>
      <div className="space-y-4">
        {(["S", "A", "B"]).map((tier) => (
          <div key={tier} className="space-y-2">
            <h2 className="text-xl font-semibold">{tier} Tier</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={`${tier}-${i}`} className="rounded-md border p-4">
                  <div className="text-sm text-muted-foreground">버전: YYYY-MM</div>
                  <div className="mt-2 h-24 rounded-md bg-gray-100 dark:bg-gray-800" />
                  <div className="mt-2 text-sm">덱 설명 요약</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




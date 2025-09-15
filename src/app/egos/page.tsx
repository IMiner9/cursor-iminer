export default function EgosPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">E.G.O 정보</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-md border p-3">
            <div className="aspect-[4/5] rounded-md bg-gray-100 dark:bg-gray-800 mb-2" />
            <div className="text-sm font-medium">E.G.O 이름</div>
            <div className="text-xs text-muted-foreground">등급</div>
          </div>
        ))}
      </div>
    </section>
  );
}




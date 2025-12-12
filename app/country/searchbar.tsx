"use client"; // <--- Required for event listeners

import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Logic: Update the URL when the user types
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    // This updates the URL without refreshing the page
    // Example: /countries -> /countries?query=canada
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-8 w-full max-w-md mx-auto">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
        placeholder="Search countries..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
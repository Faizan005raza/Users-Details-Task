import Image from "next/image";

type Country = {
  id: number;
  name: string;
  capital: string;
  flag: string;
};

async function getCountry(): Promise<Country[]> {
  const API_URL = "https://www.apicountries.com/countries";
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch Data");
  }
  return response.json();
}

export default async function CountryPage() {
  const countrylist = await getCountry();
  const FLAG_WIDTH = 100;
  const FLAG_HEIGHT = 60;

  return (
    <div className="flex flex-col py-10 px-5">
      <h1 className="text-4xl text-center underline mb-10">
        All Country Page Details
      </h1>

      
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countrylist.map((country) => (
          <li
            key={country.id}
          
            className="flex flex-col items-center p-5 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white"
          >
            <Image
              src={country.flag}
              alt={`Flag of ${country.name}`}
              width={FLAG_WIDTH}
              height={FLAG_HEIGHT}
              className="object-cover rounded-md mb-4"
            />

            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {country.name}
              </h2>
              <h3 className="text-gray-500">{country.capital}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

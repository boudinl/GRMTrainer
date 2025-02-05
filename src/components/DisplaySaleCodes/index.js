import { getAllSaleCodes } from "@/services/saleCode";

export default async function DisplaySaleCodes() {
  const saleCodes = await getAllSaleCodes();

  return (
    <div>
      {/* Bandeau des codes de réduction */}
      {saleCodes && saleCodes.data && saleCodes.data.length > 0 && (
        <div className="bg-black text-white mt-4  md:p-1 md:mt-0 text-center fixed w-full z-10 ">
          <ul className="list-none p-0">
            {saleCodes.data.map((code, index) => (
              <li className="my-2" key={index}>
                - {code.priceDrop}% de réduction avec le code :{" "}
                <strong>{code.code}</strong>
                {code.sponsor && code.sponsor.trim() !== "" && (
                  <span>
                    {" "}
                    grâce au partenaire <strong>{code.sponsor}</strong>{" "}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

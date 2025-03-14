"use client";

import { useRouter } from "next/navigation";

export default function ProductTile({ item }) {
  const router = useRouter();

  return (
    <div onClick={() => router.push(`/product/${item._id}`)}>
      <div className="overflow-hidden aspect-w-1 aspect-h-1  h-64 sm:h-72 md:h-80">
        <img
          src={item.imageUrl}
          alt="ProductImage"
          className="h-full  w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === "yes" ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Promotion
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          {item.devis === "yes" ? (
            <p className="text-sm font-semibold ">Sur devis</p>
          ) : (
            <>
              <p
                className={`mr-3 text-sm font-semibold ${
                  item.onSale === "yes" ? "line-through" : ""
                }`}
              >
                {`${item.price}€`}
              </p>
              {item.onSale === "yes" && (
                <>
                  <p className="mr-3 text-sm font-semibold text-red-700">
                    {`${(
                      item.price -
                      item.price * (item.priceDrop / 100)
                    ).toFixed(2)}€`}
                  </p>
                  <p className="mr-3 text-sm font-semibold">{`-(${item.priceDrop}%) de réduction`}</p>
                </>
              )}
            </>
          )}
        </div>
        <h3 className="md-2 text-xl text-or">{item.name}</h3>
      </div>
    </div>
  );
}

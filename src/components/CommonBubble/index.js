export default function CommonBubble({ text, signature, direction = "left" }) {
    return (
      <div className={`flex ${direction === "left" ? "justify-start" : "justify-end"} mb-4 ml-32 mr-32`}>
        <div
          className={`relative max-w-md p-4  bg-gradient-to-r from-yellow-300  to-or rounded-lg shadow-lg ${direction === "left" ? "text-left" : "text-right"}`}
        >
          {/* Texte dans la bulle */}
          <p className="font-semibold text-gray-800">{text}</p>
          <p className="mt-2 font-bold text-gray-600">{`- ${signature}`}</p>
  
          
      </div>
      </div>
    );
  }
  
export default function Presentation() {
  return (
    <div className="container mx-auto p-6 ">
      {/* Introduction avec la première photo */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12 ">
        <div className="md:w-1/6 mb-6 md:mb-0">
          <img
            src="/image1.jpg"
            alt="Jérémy Triaud"
            className="rounded-full w-48 h-48 object-cover shadow-lg mx-auto md:mx-0"
          />
        </div>
        <div className="md:w-5/6 md:pl-6 mt-8 border-t  p-6 ml-2 rounded-lg shadow-xl">
          <h1 className="text-3xl font-semibold  mb-4">
            Je suis Jérémy Triaud
          </h1>
          <p className="text-lg ">
            Je suis un entrepreneur passionné par le sport et le bien-être. J'ai
            décidé de mettre mon expertise et mon expérience au service des
            autres en devenant coach sportif.
          </p>
        </div>
      </div>
      <div className="mb-12 border-t border-b p-6 rounded-lg shadow-xl ">
        <h2 className="text-2xl font-semibold  mb-4">
          Mon approche du coaching
        </h2>
        <p className="text-lg  leading-relaxed">
          En tant que coach, je suis convaincu qu'il n'y a pas de recette
          unique. Chaque personne a des besoins et des objectifs différents.
          C'est pourquoi j'adapte chaque programme en fonction de vos capacités
          et de vos aspirations, pour vous offrir un suivi personnalisé et de
          qualité.
        </p>
      </div>
      {/* Deuxième photo avec description */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            src="/image4.jpg"
            alt="Jérémy en entraînement"
            className="rounded-lg w-full h-80 object-cover shadow-lg mx-auto md:mx-0"
          />
        </div>
        {/* Histoire et parcours */}
        <div className="md:w-2/3 ml-4  p-4 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold  mb-4">Mon parcours sportif</h2>
          <p className="text-lg  leading-relaxed mb-4">
            Depuis mon plus jeune âge, j'ai baigné dans un environnement
            sportif, ce qui a façonné mon caractère et nourri une passion
            indéfectible pour l'activité physique. Le football, ma vocation dès
            l'enfance, m'a enseigné des leçons précieuses sur la camaraderie, la
            gestion de l'adversité et le dépassement de soi.
          </p>
          <p className="text-lg  leading-relaxed mb-4">
            En plus du football, j'ai exploré diverses disciplines sportives,
            acquérant une vision globale et les bénéfices de la diversité dans
            l'entraînement. À 17 ans, j'ai transitionné vers le rôle
            d'entraîneur, guidant de nombreux jeunes athlètes.
          </p>
          <p className="text-lg  leading-relaxed">
            J'ai décidé d'en faire mon métier avec détermination et passion.
            J'ai obtenu divers diplômes pour être le plus diversifié possible,
            enrichissant ainsi mes compétences.
          </p>
        </div>
      </div>

      {/* Spécialisation avec effet de relief */}
      <div className="mb-12  p-6 rounded-lg shadow-xl border-t border-b">
        <h2 className="text-2xl font-semibold  mb-4">Ma spécialisation</h2>
        <p className="text-lg  leading-relaxed mb-4">
          Je me spécialise dans la transformation physique avec une approche
          au-delà des simples entraînements et régimes. Je m'engage à comprendre
          les motivations et les habitudes de vie de mes clients pour créer un
          environnement de soutien. Le changement exige des sacrifices, et je
          partage mes connaissances pour aider au mieux, car seule la
          connaissance partagée a du sens.
        </p>
      </div>

      {/* Signature */}
      <div className="text-center mt-12">
        <p className="text-lg ">
          N'hésitez pas à me contacter pour plus d'informations ou pour
          commencer votre parcours avec moi !
        </p>
      </div>
    </div>
  );
}

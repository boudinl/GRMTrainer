export default function Presentation() {
  return (
    <div className="container mx-auto p-6 text-justify ">
      <h1 className="text-4xl font-semibold text-or  mb-4">Qui-suis-je ? </h1>
      {/* Introduction avec la première photo */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12 ">
        <div className="md:w-1/6 mb-6 md:mb-0">
          <img
            src="/image4.jpg"
            alt="Jérémy Triaud"
            className="rounded-full w-48 h-48 object-cover shadow-lg mx-auto md:mx-0"
          />
        </div>
        <div className="md:w-5/6 md:pl-6 mt-8 border-t  p-6 ml-2 rounded-lg shadow-xl">
          <p className="text-lg ">
            Je m’appelle Jérémy, je suis le Fondateur de GRM TRAINER,
            responsable d’une salle de sport dans le Puy-de Dômes et coach
            sportif.
          </p>
          <p className="text-lg">
            Depuis toujours, le sport a occupé une place centrale dans ma vie.
            Évoluer dans un environnement où l’activité physique était
            omniprésente a façonné mon caractère et nourri une passion profonde.
            Cette expérience m’a permis d’assimiler des valeurs essentielles
            telles que le travail d’équipe, la discipline et la persévérance.
          </p>
        </div>
      </div>
      <div className="mb-12 border-t border-b p-6 rounded-lg shadow-xl ">
        <p className="text-lg  leading-relaxed">
          Très jeune, le football est devenu bien plus qu’un simple jeu : il a
          été mon école de vie. Il m’a appris la camaraderie, la gestion des
          défis et le dépassement de soi. Ce sport a non seulement façonné ma
          vision du monde, mais il a également été le socle de mon développement
          personnel.
        </p>
        <p className="text-lg  leading-relaxed">
          Curieux et passionné, j’ai exploré de nombreuses disciplines sportives
          au fil des ans. Cette polyvalence m’a offert une compréhension globale
          de l’entraînement et des bienfaits qu’apporte la diversité dans le
          sport.
        </p>
        <p className="text-lg  leading-relaxed">
          À l’âge de 17 ans, j’ai troqué le terrain pour le rôle d’entraîneur.
          Ce passage précoce a marqué le début de ma vocation : accompagner et
          inspirer. Guidé par cette passion, j’ai eu l’opportunité de former de
          nombreux jeunes athlètes, renforçant ainsi ma conviction de poursuivre
          cette voie en tant que métier.
        </p>
      </div>
      {/* Deuxième photo avec description */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
        <div className="md:w-1/3 mb-6 md:mb-0">
          <img
            src="/image1.jpg"
            alt="Jérémy en entraînement"
            className="rounded-lg w-full h-80 object-cover shadow-lg mx-auto md:mx-0"
          />
        </div>
        {/* Histoire et parcours */}
        <div className="md:w-2/3 ml-4  p-4 rounded-lg shadow-xl">
          <p className="text-lg  leading-relaxed mb-4">
            Pour approfondir mes compétences, j’ai suivi diverses formations et
            obtenu plusieurs diplômes. Ces apprentissages m’ont permis de
            perfectionner mon approche et de m’adapter aux besoins variés de mes
            adhérents.
          </p>
          <p className="text-lg  leading-relaxed mb-4">
            Aujourd’hui, je me spécialise avant tout dans la perte de poids,
            tout en proposant une approche complète pour des transformations
            physiques. J’accompagne mes adhérents en allant bien au-delà des
            simples entraînements et régimes. Je m’engage à comprendre en
            profondeur leurs motivations, leurs habitudes de vie et la relation
            qu’ils entretiennent avec leur corps. Mon objectif est de créer un
            environnement dans lequel mes adhérents se sentent soutenus,
            valorisés et capables d’atteindre leurs objectifs de manière
            durable.
          </p>
        </div>
      </div>

      {/* Spécialisation avec effet de relief */}
      <div className="mb-12  p-6 rounded-lg shadow-xl border-t border-b">
        <p className="text-lg  leading-relaxed mb-4">
          Je suis convaincu que l’action est la clé pour transformer nos vies.
          Le changement demande du courage, des sacrifices et parfois de
          l’inconfort, mais il en vaut toujours la peine. Je partage avec vous
          tout ce que j’ai appris, car je crois que la connaissance n’a de
          valeur que lorsqu’elle est partagée. Ensemble, nous tracerons le
          chemin vers vos réussites.
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

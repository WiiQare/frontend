import CardHeader from "../../atoms/Card/Header";
import Link from "next/link";
import SavingCard from "../../atoms/Card/Saving";

const savings = [
	{
		title: "Pour moi",
		img: "https://i.goopics.net/yojhn7.png"
	},
	{
		title: "Famille",
		img: "https://i.goopics.net/cub5b2.png"
	},
	{
		title: "Enfant",
		img: "https://i.goopics.net/dtrv5p.png"
	},
	{
		title: "Femme enceinte",
		img: "https://i.goopics.net/gl9c62.png",
		month: 9
	},
	{
		title: "Diabétique",
		img: "https://i.goopics.net/3w4x3m.png"
	},
	{
		title: "Hyper tendu",
		img: "https://i.goopics.net/hhbm6i.png"
	},
]

const NewSaving = () => {

	return (
		<div className="p-2 space-y-6 md:py-8 md:px-6 mb-20 md:mb-10">
			<CardHeader
				title={"Nouvelle épargne"}
				breadcrumbs={[{ link: "/saving", item: "Épargne de santé" }, { link: "/saving/new", item: "Séléctionner le type d'épargne" }]}
				download={false}
			/>

			<div className="my-10 md:my-20 grid md:grid-cols-4 grid-cols-2 gap-5 md:gap-10 items-center justify-center self-center">

				{
					savings.map((saving, index) => (

						<SavingCard 
							key={index}
							title={saving.title}
							img={saving.img}
							month={saving.month}
						/>
					))
				}

				<div className="flex flex-col w-full h-full p-6 bg-white rounded-lg shadow-sm col-span-2 order-1 md:order-2">
					<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{"Vous éparnez pour qui, mieux pour quoi ?"}</h5>
					<p className="font-normal text-gray-700 text-sm">
						{"Sélectionner un type d'épargne par ceux présenter ici, les calculs des prix d'épargne sont fait suivant le type d'épargne choisi."}
					</p>

					<p className="font-normal text-gray-700 text-sm mt-2">
						{"Epargner c'est vivre le futur, c'est condamner le futur à être meilleur pour vous et surtout ceux qui vous sont cher..."}
					</p>
				</div>
			</div>

		</div>
	);
};

export default NewSaving;
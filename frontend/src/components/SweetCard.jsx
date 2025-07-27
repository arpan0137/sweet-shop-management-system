import React from "react";

const SweetCard = ({ sweet }) => {
	const isOutOfStock = sweet.quantityinstock === 0;

	return (
		<div
			className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
			data-aos="fade-up"
		>
			<div className="p-6">
				<h3 className="text-2xl font-bold text-gray-800 mb-2">
					{sweet.name}
				</h3>
				<p className="text-sm text-gray-500 mb-4">{sweet.category}</p>

				<div className="flex justify-between items-center mb-4">
					<p className="text-xl font-semibold text-purple-600">
						₹{sweet.price}
					</p>
					<p
						className={`text-sm font-medium ${
							isOutOfStock ? "text-red-500" : "text-green-600"
						}`}
					>
						{isOutOfStock
							? "Out of Stock"
							: `${sweet.quantityinstock} in stock`}
					</p>
				</div>

				<button
					disabled={isOutOfStock}
					className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Purchase
				</button>
			</div>
		</div>
	);
};

export default SweetCard;

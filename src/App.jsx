import React, {useState} from "react";
import {Menu, X, ChevronDown} from "lucide-react";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<nav className="bg-white shadow-md fixed w-full z-50">
			<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
				<div className="text-2xl font-bold text-indigo-600">
					GigFloww
				</div>
				{/* <div className="text-1xl font-bold">
					GigFloww
				</div> */}

				<div className="hidden md:flex items-center space-x-8">
					<a href="/" className="text-gray-700 hover:text-indigo-600">
						Home
					</a>
					<div className="relative">
						<button
							onClick={() => setDropdownOpen(!dropdownOpen)}
							className="flex items-center text-gray-700 hover:text-indigo-600"
						>
							Services <ChevronDown className="w-4 h-4 ml-1" />
						</button>
						{dropdownOpen && (
							<div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md py-2">
								<a
									href="/"
									className="block px-4 py-2 text-sm hover:bg-gray-100"
								>
									Web Development
								</a>
								<a
									href="/"
									className="block px-4 py-2 text-sm hover:bg-gray-100"
								>
									Graphic Design
								</a>
								<a
									href="/"
									className="block px-4 py-2 text-sm hover:bg-gray-100"
								>
									Content Writing
								</a>
							</div>
						)}
					</div>
					<a href="/" className="text-gray-700 hover:text-indigo-600">
						About
					</a>
					<a href="/" className="text-gray-700 hover:text-indigo-600">
						Contact
					</a>
				</div>

				<div className="md:hidden">
					<button onClick={() => setIsOpen(!isOpen)}>
						{isOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{isOpen && (
				<div className="md:hidden px-4 pb-4">
					<a href="/" className="block py-2 text-gray-700">
						Home
					</a>
					<button
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="flex items-center w-full py-2 text-gray-700"
					>
						Services <ChevronDown className="w-4 h-4 ml-1" />
					</button>
					{dropdownOpen && (
						<div className="pl-4">
							<a
								href="/"
								className="block py-1 text-sm text-gray-600"
							>
								Web Development
							</a>
							<a
								href="/"
								className="block py-1 text-sm text-gray-600"
							>
								Graphic Design
							</a>
							<a
								href="/"
								className="block py-1 text-sm text-gray-600"
							>
								Content Writing
							</a>
						</div>
					)}
					<a href="/" className="block py-2 text-gray-700">
						About
					</a>
					<a href="/" className="block py-2 text-gray-700">
						Contact
					</a>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

import { useState } from 'react';
import { motion } from 'framer-motion';
import 'animate.css';
import plus from '../../images/plus-2.svg';
// eslint-disable-next-line react/prop-types
function CurriculumSection({ title, description, ...props }) {
	const [isOpen, setIsOpen] = useState(false);
	``;
	return (
		<motion.div  className="curriculum-section" {...props}>
			<div className={`curriculum-section__title ${isOpen ? 'border' : ''}`}>
				<h2>{title}</h2>
				<motion.img
					initial={{ rotate: 0 }}
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.5 }}
					className="curriculum-section__icon-open"
					src={plus}
					alt="plus"
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: isOpen ? 1 : 0 }}
				transition={{ duration: 0.5 }}
				className={`curriculum-section__description ${isOpen ? 'no-high' : ''}`}
			>
				{description}
			</motion.div>
		</motion.div>
	);
}

export default CurriculumSection;

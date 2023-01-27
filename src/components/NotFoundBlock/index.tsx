import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.root}>
			<h1>
				<span> 😞</span>
				<br />
				Нічого не знайдено...
			</h1>
			<p className={styles.description}>
				Нажаль дана сторінка відсутня у нашому магазині
			</p>
		</div>
	);
};

export default NotFoundBlock;

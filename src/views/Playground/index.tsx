import React from "react";
import Loading from "@/components/Loading";
import PIGGInput from "@/components/PIGGInput";
import { Button, Input, Checkbox } from "antd";
import style from "./index.module.css";

const Playground: React.FC = () => {
	return (
		<div className={style.container}>
			<div className={style.itemContainer}>
				<Loading />
			</div>
			<div className={style.itemContainer}>
				<PIGGInput />
			</div>
			<div className={style.placeholder}></div>
			<div className={style.itemContainer}>
				<Button type="primary">123</Button>
				<Input></Input>
				<Checkbox>123</Checkbox>
			</div>
		</div>
	);
};

export default Playground;

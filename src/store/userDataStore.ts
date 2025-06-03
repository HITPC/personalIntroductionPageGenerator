import { create } from "zustand";
import type { UserDataZustand } from "@/types/userData";

export const useUserDataStore = create<UserDataZustand>((set) => ({
	basicData: {
		name: "Donald J. Trump",
		birth: "June 14, 1946",
		phone: "+1-212-758-4000", // 举例虚构号码
		email: "info@trump.org", // 举例虚构邮箱
		wx: "",
		avatar: undefined,
	},
	educationExperience: [
		{
			school: "Wharton School of the University of Pennsylvania",
			major: "Economics",
			degree: "学士",
			schoolLevel: "QS100", // 宾夕法尼亚大学未在枚举中
			startDate: "1964",
			endDate: "1968",
			schoolIcon: undefined,
		},
	],
	skillsAndCertifications: {
		skills: [
			"Business Negotiation",
			"Media Relations",
			"Real Estate Development",
			"Political Campaign Strategy",
		],
		certifications: ["MBA (Wharton, 1968)"],
	},
	internshipExperience: [],
	projectExperience: [
		{
			name: "Trump Tower",
			position: "Project Developer",
			description:
				"Designed and developed Trump Tower in New York City (1978-1983).",
			startDate: "1978",
			endDate: "1983",
		},
		{
			name: "Mar-a-Lago",
			position: "Project Director",
			description:
				"Developed the Mar-a-Lago luxury resort in Florida (1985-1990).",
			startDate: "1985",
			endDate: "1990",
		},
	],
	worksShow: {
		title: "The Art of the Deal",
		description:
			"Bestselling autobiography on business strategies and negotiations (1987).",
		image: undefined,
	},
	descriptionAboutMe: "I AM THE KNOWING KING!",
	setData: (data) => set((state) => ({ ...state, ...data })),
	resetData: () =>
		set(() => ({
			basicData: {
				name: "Donald J. Trump",
				birth: "June 14, 1946",
				phone: "+1-212-758-4000", // 举例虚构号码
				email: "info@trump.org", // 举例虚构邮箱
				wx: "",
				avatar: undefined,
			},
			educationExperience: [
				{
					school: "Wharton School of the University of Pennsylvania",
					major: "Economics",
					degree: "学士",
					schoolLevel: "QS100",
					startDate: "1964",
					endDate: "1968",
					schoolIcon: undefined,
				},
			],
			skillsAndCertifications: {
				skills: [
					"Business Negotiation",
					"Media Relations",
					"Real Estate Development",
					"Political Campaign Strategy",
				],
				certifications: ["MBA (Wharton, 1968)"],
			},
			internshipExperience: [],
			projectExperience: [
				{
					name: "Trump Tower",
					position: "Project Developer",
					description:
						"Designed and developed Trump Tower in New York City (1978-1983).",
					startDate: "1978",
					endDate: "1983",
				},
				{
					name: "Mar-a-Lago",
					position: "Project Director",
					description:
						"Developed the Mar-a-Lago luxury resort in Florida (1985-1990).",
					startDate: "1985",
					endDate: "1990",
				},
			],
			worksShow: {
				title: "The Art of the Deal",
				description:
					"Bestselling autobiography on business strategies and negotiations (1987).",
				image: undefined,
			},
			descriptionAboutMe: "I AM THE KNOWING KING!",
		})),
}));

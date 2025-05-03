import OnboardingItem from "@/components/OnboardingItem";
import { OnboardingItemProps } from "@/types";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";

const data: OnboardingItemProps[] = [
	{
		header: "Education is the best learn ever",
		subHeader:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
		image: require("@/assets/images/onboarding/onboarding_one.png"),
		bgColors: ["#DEE9FF", "#ffff", "#DEE9FF"],
	},
	{
		header: "Education is the best learn ever",
		subHeader:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
		image: require("@/assets/images/onboarding/onboarding_two.png"),
		bgColors: ["#FCECDB", "#FFB27D"],
	},
	{
		header: "Education is the best learn ever",
		subHeader:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
		image: require("@/assets/images/onboarding/onboarding_three.png"),
		bgColors: ["#E5FFD8", "#ffff"],
	},
];

const Onboarding = () => {
	const slidesRef = useRef<any>(null);
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currenIndex, setCurrenIndex] = useState(0);

	//Currently viewed index
	const viewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: any[] }) => {
			setCurrenIndex(viewableItems[0].index);
		}
	).current;

	//Next slide needs to be 50% on screen before it changes
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

	function scrollToNext() {
		if (currenIndex < data.length - 1) {
			slidesRef.current.scrollToIndex({ index: currenIndex + 1 });
		} else {
			router.navigate("/register");
		}
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => (
					<OnboardingItem
						key={index}
						item={item}
						index={currenIndex}
						onScrollToNext={scrollToNext}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				onViewableItemsChanged={viewableItemsChanged}
				viewabilityConfig={viewConfig}
				scrollEventThrottle={32}
				ref={slidesRef}
			/>
		</View>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		flex: 1,
	},
});

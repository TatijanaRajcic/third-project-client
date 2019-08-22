import React from 'react';
import Nav from "../components/Nav";

// This component is meant to share 
// a basic layout that is used by multiple pages.
// In this case, the basic layout is very simple: it only adds a navbar.
// However, you could extend it by adding a footer or a sidebar.
// The advantage of using a layout component is that: 
// A) You don't repeat yourself on every page where you're using the same layout. (DRY)
// B) If you decide you want your layout to look slightly different, you only have to make 
//    make changes at 1 place. 
const MainLayout = (props) => {
	return (
	//    <></> is a fragment that is used to wrap around adjacent components. 
	//    Unlike <div></div> framgents don't influence the layout
		<>
			<Nav />
			{props.children}
			{/* props.children will be substituted with everything
			that is within <MainLayout> and </MainLayout> */}
		</>
	);
}

export default MainLayout;
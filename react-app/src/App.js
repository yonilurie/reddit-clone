import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { authenticate } from "./store/session";

import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Profile from "./components/Profile/index";
import Subreddit from "./components/Subreddit";
import HomePage from "./components/HomePage";
import SinglePostPage from "./components/SinglePost";
import SubredditEdit from "./components/SubredditEdit";
import SubmitPage from "./components/SubmitPage";
import Error404 from "./components/ErrorPages/404";
import About from "./components/About";
import SearchPage from "./components/SearchPage";

function App() {
	const dispatch = useDispatch();
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) return null;

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact={true}>
					<NavBar />
					<HomePage></HomePage>
				</Route>
				<Route path="/about" exact={true}>
					<NavBar />
					<About></About>
				</Route>
				<Route path="/search">
					<NavBar />
					<SearchPage></SearchPage>
				</Route>
				<Route path="/r/:subreddit([A-Z]\w+)" exact={true}>
					<NavBar />
					<Subreddit></Subreddit>
				</Route>{" "}
				<Route path="/r/:subreddit([A-Z]\w+)/:postId(\d+)" exact={true}>
					<NavBar />
					<SinglePostPage></SinglePostPage>
				</Route>
				<ProtectedRoute
					path="/r/:subreddit([A-Z]\w+)/:section([A-Z]\w+)"
					exact={true}
				>
					<NavBar />
					<SubredditEdit></SubredditEdit>
				</ProtectedRoute>
				<Route path="/user/:username" exact={true}>
					<NavBar />
					<Profile />
				</Route>
				<Route path="/user/:username/submitted" exact={true}>
					<NavBar />
					<Profile />
				</Route>
				<ProtectedRoute path="/user/:username/submit" exact={true}>
					<NavBar />
					<SubmitPage />
				</ProtectedRoute>
				<Route path="/user/:username/:tab" exact={true}>
					<NavBar />
					<Profile />
				</Route>
				<Route>
					<NavBar />
					<Error404></Error404>
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;

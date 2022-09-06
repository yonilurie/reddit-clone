import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import Profile from "./components/Profile/index";
import Subreddit from "./components/Subreddit";
import HomePage from "./components/HomePage";
import SinglePostPage from "./components/SinglePost";
import SubredditEdit from "./components/SubredditEdit";
import { authenticate } from "./store/session";

import SubredditLoading from "./components/Subreddit/SubredditLoading";

import SubmitPage from "./components/SubmitPage";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/" exact={true}>
					<HomePage></HomePage>
				</Route>
				<Route path="/test">
					<SubredditLoading></SubredditLoading>
				</Route>
				<Route path="/r/:subreddit" exact={true}>
					<Subreddit></Subreddit>
				</Route>
				<ProtectedRoute path="/r/:subreddit/:section" exact={true}>
					<SubredditEdit></SubredditEdit>
				</ProtectedRoute>
				<Route path="/r/:subreddit/:postId/:postTitle" exact={true}>
					<SinglePostPage></SinglePostPage>
				</Route>
				<Route path="/user/:username" exact={true}>
					<Profile />
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/user/:username/submit" exact={true}>
					<SubmitPage />
				</ProtectedRoute>
				<Route path="/user/:username/:tab" exact={true}>
					<Profile />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;

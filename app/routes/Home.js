import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
function Home({ match }) {
	console.log(match)
	return (
		<MainLayout match={match}>
			{match.path}
		</MainLayout>
	);
}


export default connect()(Home);

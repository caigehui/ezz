import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout';
function Home({ match }) {
	return (
		<MainLayout match={match}>
			{match.url}
		</MainLayout>
	);
}


export default connect()(Home);

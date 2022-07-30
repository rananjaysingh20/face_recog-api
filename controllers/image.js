const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey:'795f37c6f4404959afefe5d9507370a4'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('api down'))
}
const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id','=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0].entries);
		})
		.catch(err => res.status(400).json('unable to get count'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};
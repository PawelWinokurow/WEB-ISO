
function unknownErrorResponse(error, status) {
    console.error(error.stack);
    res.status(status).send({
        error: error
    });
}


module.exports = {
    unknownErrorResponse,
};
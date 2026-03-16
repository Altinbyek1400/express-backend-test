async function getAllUserService() {
    try {
        return {
            status: 200,
            data: {},
            message: 'Амжилттай'
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    getAllUserService
}
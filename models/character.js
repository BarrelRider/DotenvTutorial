module.exports = class Character {
    constructor(data) {
        this.avatar = data.image
        this.info = {
            name: data.name,
            status: data.status,
            gender: data.gender,
            species: data.species,
            originLocation: data.origin.name,
            currentLocation: data.location.name
        }
    }
}
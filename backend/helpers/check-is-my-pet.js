    function checkIfPetIsMy(res, petId, userId) {
        if(petId.toString() !== userId.toString()) {
            res.status(422).json({message: 'Houve um problema em processar a sua solictação, tente novamente mais tarde!'});
            return;
        }
    }

    export default checkIfPetIsMy;
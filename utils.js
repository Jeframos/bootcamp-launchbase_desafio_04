module.exports = {
    age: function(timestamp){
        const today = new Date()

        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()

        const month = today.getMonth() - birthDate.getMonth()

        if(month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1
        }

        return age
    },

    graduation: function(level){
        if (level == "ensino_medio"){
            return "ENSINO MÉDIO"}
            if(level == "superior_concluido"){
                return "SUPERIOR CONCLUÍDO"}
                if(level == "mestrado"){
                    return "MESTRADO"}
                    else return "DOUTORADO"
    },

    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate() + 1}`.slice(-2)

        return `${year}-${month}-${day}`
    }

}
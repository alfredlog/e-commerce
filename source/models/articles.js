module.exports = (sequelize, datatype) =>
{
    return sequelize.define(
        "article",
        {
            id:{
                type : datatype.INTEGER,
                autoIncrement : true,
                primaryKey : true
            },
            name:
            {
                type : datatype.STRING,
                allowNull : false,
                validate :
                {
                    notNull : {nachricte: "Der name des artikels darf nicht null sein"},
                    notEmpty : {nachricte : "Der name des artikels darf nicht leer sein"}
                }
            },
            preis:
            {
                type : datatype.INTEGER,
                allowNull : false,
                validate :
                {
                    isInt : {nachricte : "Der preis muss ein zahl sein"}
                }
            },
            Quantitat :
            {
                type : datatype.INTEGER,
                allowNull : false,
                validate :
                {
                    isInt : {nachricte : "Die Quantität muss ein zahl sein"}
                }
            },
            Beschreibung :
            {
                type : datatype.STRING,
                allowNull : false,
                validate :
                {
                    notNull : {nachricte : "Die Beschreibung darf nicht null sein"},
                    notEmpty : {nachricte :"Die Beschreibung darf nich leer sein"}
                }
            },
            Geschäft:
            {
                type : datatype.STRING,
                allowNull : false,
                validate : 
                {
                    notNull : {nachricte : "Das Geschäft darf nicht null sein"},
                    notEmpty : {nachricte :"Das Geschäft darf nich leer sein"}
                }
            },
            bild :
            {
                type : datatype.STRING,
                allowNull : false,
            }
        },
        {
            timestamps : true,
            createdAt : "herstellung",
            updatedAt : "veränderung"
        }
    )
}
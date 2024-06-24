module.exports = (sequelise, Datatype)=>
{
   return sequelise.define("admin", {
        id : {
            type : Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type : Datatype.STRING,
            allowNull : false,
            validate: {
                notNull : {nachrichte : "Der name muss ausgefullt werden"},
                notEmpty : {nachrichte : "Der name des spielers muss keine null sein"}

            }
        },
        passwort : {
            type : Datatype.STRING,
            allowNull : false,
            validate:{
                notNull : {nachrichte : "Der name muss ausgefullt werden"},
                notEmpty : {nachrichte : "Das passwort muss ausgefullt werden"}
            } 
        },
        email:
        {
            type: Datatype.STRING,
            allowNull : false,
            unique : {nachrichte : "Der benutzer mit dieser E-mail exiestiert schon, also wechseln Sie bitte"},
            validate:{
                notNull : {nachrichte : "Der name muss ausgefullt werden"},
                notEmpty : {nachrichte : "Der name des spielers muss keine null sein"}
            }
        },
        geschäft:
        {
            type : Datatype.STRING,
            allowNull : false,
            unique : {nachrichte : "Das Geschäft mit dieser name exiestiert schon, also wechseln Sie bitte"},
            validate:{
                notNull : {nachrichte : "Der name muss ausgefullt werden"},
                notEmpty : {nachrichte : "Der name des Geschäft muss nicht null sein"}
            }
        },
        beschreibung:
        {
            type : Datatype.STRING,
            allowNull : false,
            validate:{
                notNull : {nachrichte : "Die Beschreibung muss ausgefullt werden"},
                notEmpty : {nachrichte : "Die Beschreibung des Geschäft muss nicht null sein"}
            }
        },
        bild:
        {
            type : Datatype.STRING,
            allowNull : false,
        },
        sold:
        {
            type : Datatype.INTEGER,
            allowNull : false,
            validate:{
                isInt:{nachrichte: "Der sold muss eine Zahle sein "}
            }
        }
    },
    {
        timestamps : true,
        createdAt : "erstellung",
        updatedAt : "veranderung"
    })
}
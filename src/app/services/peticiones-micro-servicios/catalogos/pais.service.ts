import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { respuestaCatalogos } from '../../../models/catalogos/datosCatalogos.model';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  constructor(private http: HttpClient) {}

  getPaises() {
    return of(JSON.parse(`

{
    "code": "200",
    "message": "Consulta Exitosa",
    "internalCode": "0000",
    "data": [
        {
            "id": 1,
            "nombre": "AFGANISTAN",
            "estatus": 1
        },
        {
            "id": 2,
            "nombre": "ALBANIA",
            "estatus": 1
        },
        {
            "id": 3,
            "nombre": "ALEMANIA",
            "estatus": 1
        },
        {
            "id": 4,
            "nombre": "ANDORA",
            "estatus": 1
        },
        {
            "id": 5,
            "nombre": "ANGOLA",
            "estatus": 1
        },
        {
            "id": 6,
            "nombre": "ANGUILLA",
            "estatus": 1
        },
        {
            "id": 7,
            "nombre": "ANTARTIDA",
            "estatus": 1
        },
        {
            "id": 8,
            "nombre": "ANTIGUA Y BARBUDA",
            "estatus": 1
        },
        {
            "id": 9,
            "nombre": "ANTILLAS NEERLANDESAS",
            "estatus": 1
        },
        {
            "id": 10,
            "nombre": "ARABIA SAUDITA",
            "estatus": 1
        },
        {
            "id": 11,
            "nombre": "ARGELIA",
            "estatus": 1
        },
        {
            "id": 12,
            "nombre": "ARGENTINA",
            "estatus": 1
        },
        {
            "id": 13,
            "nombre": "ARMENIA",
            "estatus": 1
        },
        {
            "id": 14,
            "nombre": "ARUBA ISLA",
            "estatus": 1
        },
        {
            "id": 15,
            "nombre": "ASCENCION",
            "estatus": 1
        },
        {
            "id": 16,
            "nombre": "AUSTRALIA",
            "estatus": 1
        },
        {
            "id": 17,
            "nombre": "AUSTRIA",
            "estatus": 1
        },
        {
            "id": 18,
            "nombre": "AZERBAIYAN",
            "estatus": 1
        },
        {
            "id": 19,
            "nombre": "BAHAMAS",
            "estatus": 1
        },
        {
            "id": 20,
            "nombre": "BAHREIN",
            "estatus": 1
        },
        {
            "id": 21,
            "nombre": "BANGLADESH",
            "estatus": 1
        },
        {
            "id": 22,
            "nombre": "BARBADOS",
            "estatus": 1
        },
        {
            "id": 23,
            "nombre": "BELARUS",
            "estatus": 1
        },
        {
            "id": 24,
            "nombre": "BELGICA",
            "estatus": 1
        },
        {
            "id": 25,
            "nombre": "BELICE",
            "estatus": 1
        },
        {
            "id": 26,
            "nombre": "BENIN",
            "estatus": 1
        },
        {
            "id": 27,
            "nombre": "BERMUDAS",
            "estatus": 1
        },
        {
            "id": 28,
            "nombre": "BHUTAN",
            "estatus": 1
        },
        {
            "id": 29,
            "nombre": "BOLIVIA",
            "estatus": 1
        },
        {
            "id": 30,
            "nombre": "BONAIRE",
            "estatus": 1
        },
        {
            "id": 31,
            "nombre": "BOSNIA HERZEGOVINA",
            "estatus": 1
        },
        {
            "id": 32,
            "nombre": "BOTSWANA",
            "estatus": 1
        },
        {
            "id": 33,
            "nombre": "BRASIL",
            "estatus": 1
        },
        {
            "id": 34,
            "nombre": "BRUNEI DARUSSALAM",
            "estatus": 1
        },
        {
            "id": 35,
            "nombre": "BULGARIA",
            "estatus": 1
        },
        {
            "id": 36,
            "nombre": "BURKINA FASSO",
            "estatus": 1
        },
        {
            "id": 37,
            "nombre": "BURUNDI",
            "estatus": 1
        },
        {
            "id": 38,
            "nombre": "CABO VERDE",
            "estatus": 1
        },
        {
            "id": 39,
            "nombre": "CAIMAN ISLAS",
            "estatus": 1
        },
        {
            "id": 40,
            "nombre": "CAMBOYA",
            "estatus": 1
        },
        {
            "id": 41,
            "nombre": "CAMERUN",
            "estatus": 1
        },
        {
            "id": 42,
            "nombre": "CANADA",
            "estatus": 1
        },
        {
            "id": 43,
            "nombre": "CHAD",
            "estatus": 1
        },
        {
            "id": 60,
            "nombre": "CHECA REPUBLICA",
            "estatus": 1
        },
        {
            "id": 44,
            "nombre": "CHEQUIA",
            "estatus": 1
        },
        {
            "id": 45,
            "nombre": "CHILE",
            "estatus": 1
        },
        {
            "id": 61,
            "nombre": "CHILE",
            "estatus": 1
        },
        {
            "id": 62,
            "nombre": "CHINA",
            "estatus": 1
        },
        {
            "id": 46,
            "nombre": "CHINA",
            "estatus": 1
        },
        {
            "id": 47,
            "nombre": "CHIPRE",
            "estatus": 1
        },
        {
            "id": 63,
            "nombre": "CHIPRE",
            "estatus": 1
        },
        {
            "id": 48,
            "nombre": "CLIPPERTON",
            "estatus": 1
        },
        {
            "id": 49,
            "nombre": "COLOMBIA",
            "estatus": 1
        },
        {
            "id": 50,
            "nombre": "COMORAS",
            "estatus": 1
        },
        {
            "id": 51,
            "nombre": "CONGO",
            "estatus": 1
        },
        {
            "id": 52,
            "nombre": "COOK ISLAS",
            "estatus": 1
        },
        {
            "id": 53,
            "nombre": "COREA NORTE",
            "estatus": 1
        },
        {
            "id": 54,
            "nombre": "COREA SUR",
            "estatus": 1
        },
        {
            "id": 55,
            "nombre": "COSTA DE MARFIL",
            "estatus": 1
        },
        {
            "id": 56,
            "nombre": "COSTA RICA",
            "estatus": 1
        },
        {
            "id": 57,
            "nombre": "CROACIA",
            "estatus": 1
        },
        {
            "id": 58,
            "nombre": "CUBA",
            "estatus": 1
        },
        {
            "id": 59,
            "nombre": "CURAZAO",
            "estatus": 1
        },
        {
            "id": 64,
            "nombre": "DIEGO GARCIA",
            "estatus": 1
        },
        {
            "id": 65,
            "nombre": "DINAMARCA",
            "estatus": 1
        },
        {
            "id": 66,
            "nombre": "DJIBOUTI",
            "estatus": 1
        },
        {
            "id": 67,
            "nombre": "DOMINICANA COM. DE",
            "estatus": 1
        },
        {
            "id": 68,
            "nombre": "DOMINICANA REP. DE",
            "estatus": 1
        },
        {
            "id": 69,
            "nombre": "ECUADOR",
            "estatus": 1
        },
        {
            "id": 70,
            "nombre": "EGIPTO",
            "estatus": 1
        },
        {
            "id": 71,
            "nombre": "EL SALVADOR",
            "estatus": 1
        },
        {
            "id": 72,
            "nombre": "EMIRATOS ARABES",
            "estatus": 1
        },
        {
            "id": 73,
            "nombre": "ERITREA",
            "estatus": 1
        },
        {
            "id": 74,
            "nombre": "ESLOVACA REP",
            "estatus": 1
        },
        {
            "id": 75,
            "nombre": "ESLOVENIA",
            "estatus": 1
        },
        {
            "id": 76,
            "nombre": "ESPAÑA",
            "estatus": 1
        },
        {
            "id": 77,
            "nombre": "ESTADOS UNIDOS",
            "estatus": 1
        },
        {
            "id": 78,
            "nombre": "ESTONIA",
            "estatus": 1
        },
        {
            "id": 79,
            "nombre": "ETIOPIA",
            "estatus": 1
        },
        {
            "id": 80,
            "nombre": "FEROES ISLAS",
            "estatus": 1
        },
        {
            "id": 81,
            "nombre": "FIJI",
            "estatus": 1
        },
        {
            "id": 82,
            "nombre": "FILIPINAS",
            "estatus": 1
        },
        {
            "id": 83,
            "nombre": "FINLANDIA",
            "estatus": 1
        },
        {
            "id": 84,
            "nombre": "FRANCIA",
            "estatus": 1
        },
        {
            "id": 85,
            "nombre": "GABON",
            "estatus": 1
        },
        {
            "id": 86,
            "nombre": "GAMBIA",
            "estatus": 1
        },
        {
            "id": 87,
            "nombre": "GEORGIA",
            "estatus": 1
        },
        {
            "id": 88,
            "nombre": "GEORGIA DEL SUR E ISLAS SANDWICH DEL SUR",
            "estatus": 1
        },
        {
            "id": 89,
            "nombre": "GHANA",
            "estatus": 1
        },
        {
            "id": 90,
            "nombre": "GIBRALTAR",
            "estatus": 1
        },
        {
            "id": 91,
            "nombre": "GRANADA",
            "estatus": 1
        },
        {
            "id": 92,
            "nombre": "GRECIA",
            "estatus": 1
        },
        {
            "id": 93,
            "nombre": "GROENLANDIA",
            "estatus": 1
        },
        {
            "id": 94,
            "nombre": "GUADALUPE",
            "estatus": 1
        },
        {
            "id": 95,
            "nombre": "GUAM",
            "estatus": 1
        },
        {
            "id": 96,
            "nombre": "GUATEMALA",
            "estatus": 1
        },
        {
            "id": 97,
            "nombre": "GUAYANA FR",
            "estatus": 1
        },
        {
            "id": 98,
            "nombre": "GUERNESEY",
            "estatus": 1
        },
        {
            "id": 99,
            "nombre": "GUINEA BISSAU",
            "estatus": 1
        },
        {
            "id": 101,
            "nombre": "GUINEA-BISSAU",
            "estatus": 1
        },
        {
            "id": 100,
            "nombre": "GUINEA REP",
            "estatus": 1
        },
        {
            "id": 102,
            "nombre": "GUYANA",
            "estatus": 1
        },
        {
            "id": 103,
            "nombre": "HAITI",
            "estatus": 1
        },
        {
            "id": 104,
            "nombre": "HONDURAS",
            "estatus": 1
        },
        {
            "id": 105,
            "nombre": "HONG KONG",
            "estatus": 1
        },
        {
            "id": 106,
            "nombre": "HUNGARIA",
            "estatus": 1
        },
        {
            "id": 107,
            "nombre": "INDIA REP",
            "estatus": 1
        },
        {
            "id": 108,
            "nombre": "INDONESIA",
            "estatus": 1
        },
        {
            "id": 110,
            "nombre": "IRAK",
            "estatus": 1
        },
        {
            "id": 109,
            "nombre": "IRAN",
            "estatus": 1
        },
        {
            "id": 111,
            "nombre": "IRLANDA",
            "estatus": 1
        },
        {
            "id": 112,
            "nombre": "ISLA BOUVET",
            "estatus": 1
        },
        {
            "id": 113,
            "nombre": "ISLA CHRISTMAS",
            "estatus": 1
        },
        {
            "id": 114,
            "nombre": "ISLA DE MAN",
            "estatus": 1
        },
        {
            "id": 116,
            "nombre": "ISLANDIA",
            "estatus": 1
        },
        {
            "id": 115,
            "nombre": "ISLA NORFOLK",
            "estatus": 1
        },
        {
            "id": 117,
            "nombre": "ISLAS ÅLAND",
            "estatus": 1
        },
        {
            "id": 118,
            "nombre": "ISLAS CAIMAN",
            "estatus": 1
        },
        {
            "id": 119,
            "nombre": "ISLAS COCOS",
            "estatus": 1
        },
        {
            "id": 120,
            "nombre": "ISLAS COOK",
            "estatus": 1
        },
        {
            "id": 121,
            "nombre": "ISLAS FEROE",
            "estatus": 1
        },
        {
            "id": 122,
            "nombre": "ISLAS HEARD Y MCDONALD",
            "estatus": 1
        },
        {
            "id": 123,
            "nombre": "ISLAS MALVINAS",
            "estatus": 1
        },
        {
            "id": 124,
            "nombre": "ISLAS MARIANAS DEL NORTE",
            "estatus": 1
        },
        {
            "id": 125,
            "nombre": "ISLAS MARSHALL",
            "estatus": 1
        },
        {
            "id": 126,
            "nombre": "ISLAS MENORES ALEJADAS DE LOS ESTADOS UNIDOS",
            "estatus": 1
        },
        {
            "id": 127,
            "nombre": "ISLAS PITCAIRN",
            "estatus": 1
        },
        {
            "id": 128,
            "nombre": "ISLAS SALOMON",
            "estatus": 1
        },
        {
            "id": 129,
            "nombre": "ISLAS TURCAS Y CAICOS",
            "estatus": 1
        },
        {
            "id": 130,
            "nombre": "ISLAS VIRGENES BRITANICAS",
            "estatus": 1
        },
        {
            "id": 131,
            "nombre": "ISLAS VIRGENES DE LOS ESTADOS UNIDOS",
            "estatus": 1
        },
        {
            "id": 132,
            "nombre": "ISRAEL",
            "estatus": 1
        },
        {
            "id": 133,
            "nombre": "ITALIA",
            "estatus": 1
        },
        {
            "id": 134,
            "nombre": "JAMAICA",
            "estatus": 1
        },
        {
            "id": 135,
            "nombre": "JAPON",
            "estatus": 1
        },
        {
            "id": 136,
            "nombre": "JERSEY",
            "estatus": 1
        },
        {
            "id": 137,
            "nombre": "JORDANIA",
            "estatus": 1
        },
        {
            "id": 138,
            "nombre": "KAZAJSTAN",
            "estatus": 1
        },
        {
            "id": 139,
            "nombre": "KENYA",
            "estatus": 1
        },
        {
            "id": 140,
            "nombre": "KIRGUISTAN",
            "estatus": 1
        },
        {
            "id": 141,
            "nombre": "KIRIBATI",
            "estatus": 1
        },
        {
            "id": 142,
            "nombre": "KOSOVO",
            "estatus": 1
        },
        {
            "id": 143,
            "nombre": "KUWAIT",
            "estatus": 1
        },
        {
            "id": 144,
            "nombre": "LAOS",
            "estatus": 1
        },
        {
            "id": 145,
            "nombre": "LESOTHO",
            "estatus": 1
        },
        {
            "id": 146,
            "nombre": "LETONIA",
            "estatus": 1
        },
        {
            "id": 147,
            "nombre": "LIBANO",
            "estatus": 1
        },
        {
            "id": 148,
            "nombre": "LIBERIA",
            "estatus": 1
        },
        {
            "id": 149,
            "nombre": "LIBIA",
            "estatus": 1
        },
        {
            "id": 150,
            "nombre": "LIECHTENSTEIN",
            "estatus": 1
        },
        {
            "id": 151,
            "nombre": "LITUANIA",
            "estatus": 1
        },
        {
            "id": 152,
            "nombre": "LUXEMBURGO",
            "estatus": 1
        },
        {
            "id": 153,
            "nombre": "MACAO",
            "estatus": 1
        },
        {
            "id": 154,
            "nombre": "MACEDONIA",
            "estatus": 1
        },
        {
            "id": 155,
            "nombre": "MADAGASCAR",
            "estatus": 1
        },
        {
            "id": 156,
            "nombre": "MALASIA",
            "estatus": 1
        },
        {
            "id": 157,
            "nombre": "MALAWI",
            "estatus": 1
        },
        {
            "id": 158,
            "nombre": "MALDIVAS",
            "estatus": 1
        },
        {
            "id": 159,
            "nombre": "MALI",
            "estatus": 1
        },
        {
            "id": 160,
            "nombre": "MALTA",
            "estatus": 1
        },
        {
            "id": 161,
            "nombre": "MALVINAS ISLAS",
            "estatus": 1
        },
        {
            "id": 162,
            "nombre": "MARIANAS ISLAS",
            "estatus": 1
        },
        {
            "id": 163,
            "nombre": "MARRUECOS",
            "estatus": 1
        },
        {
            "id": 164,
            "nombre": "MARSHALL",
            "estatus": 1
        },
        {
            "id": 165,
            "nombre": "MARTINICA",
            "estatus": 1
        },
        {
            "id": 166,
            "nombre": "MAURICIO",
            "estatus": 1
        },
        {
            "id": 167,
            "nombre": "MAURITANIA REP",
            "estatus": 1
        },
        {
            "id": 168,
            "nombre": "MAYOTTE",
            "estatus": 1
        },
        {
            "id": 169,
            "nombre": "MEXICO",
            "estatus": 1
        },
        {
            "id": 170,
            "nombre": "MICRONESIA",
            "estatus": 1
        },
        {
            "id": 171,
            "nombre": "MOLDOVA",
            "estatus": 1
        },
        {
            "id": 172,
            "nombre": "MONACO",
            "estatus": 1
        },
        {
            "id": 173,
            "nombre": "MONGOLIA",
            "estatus": 1
        },
        {
            "id": 174,
            "nombre": "MONTENEGRO",
            "estatus": 1
        },
        {
            "id": 175,
            "nombre": "MONTSERRAT",
            "estatus": 1
        },
        {
            "id": 176,
            "nombre": "MOZAMBIQUE",
            "estatus": 1
        },
        {
            "id": 177,
            "nombre": "MYANMAR",
            "estatus": 1
        },
        {
            "id": 178,
            "nombre": "NAMIBIA",
            "estatus": 1
        },
        {
            "id": 179,
            "nombre": "NAURU",
            "estatus": 1
        },
        {
            "id": 180,
            "nombre": "NEPAL",
            "estatus": 1
        },
        {
            "id": 181,
            "nombre": "NEVIS",
            "estatus": 1
        },
        {
            "id": 182,
            "nombre": "NICARAGUA",
            "estatus": 1
        },
        {
            "id": 183,
            "nombre": "NIGER",
            "estatus": 1
        },
        {
            "id": 184,
            "nombre": "NIGERIA",
            "estatus": 1
        },
        {
            "id": 185,
            "nombre": "NIUE",
            "estatus": 1
        },
        {
            "id": 186,
            "nombre": "NORUEGA",
            "estatus": 1
        },
        {
            "id": 187,
            "nombre": "NUEVA CALEDONIA",
            "estatus": 1
        },
        {
            "id": 188,
            "nombre": "NUEVA ZELANDIA",
            "estatus": 1
        },
        {
            "id": 189,
            "nombre": "OMAN SULTANIA",
            "estatus": 1
        },
        {
            "id": 190,
            "nombre": "PAISES BAJOS",
            "estatus": 1
        },
        {
            "id": 191,
            "nombre": "PAKISTAN",
            "estatus": 1
        },
        {
            "id": 192,
            "nombre": "PALAU",
            "estatus": 1
        },
        {
            "id": 193,
            "nombre": "PANAMA",
            "estatus": 1
        },
        {
            "id": 194,
            "nombre": "PAPAU",
            "estatus": 1
        },
        {
            "id": 195,
            "nombre": "PARAGUAY",
            "estatus": 1
        },
        {
            "id": 196,
            "nombre": "PERU",
            "estatus": 1
        },
        {
            "id": 197,
            "nombre": "POLINESIA FRANCESA",
            "estatus": 1
        },
        {
            "id": 198,
            "nombre": "POLONIA",
            "estatus": 1
        },
        {
            "id": 199,
            "nombre": "PORTUGAL",
            "estatus": 1
        },
        {
            "id": 200,
            "nombre": "PUERTO RICO",
            "estatus": 1
        },
        {
            "id": 201,
            "nombre": "QATAR",
            "estatus": 1
        },
        {
            "id": 202,
            "nombre": "REINO UNIDO",
            "estatus": 1
        },
        {
            "id": 203,
            "nombre": "REPUBLICA CENTROAFRICANA",
            "estatus": 1
        },
        {
            "id": 204,
            "nombre": "REPUBLICA DEMOCRATICA DEL CONGO",
            "estatus": 1
        },
        {
            "id": 205,
            "nombre": "REPUBLICA DOMINICANA",
            "estatus": 1
        },
        {
            "id": 206,
            "nombre": "REUNION",
            "estatus": 1
        },
        {
            "id": 207,
            "nombre": "RUMANIA",
            "estatus": 1
        },
        {
            "id": 208,
            "nombre": "RUSIA",
            "estatus": 1
        },
        {
            "id": 209,
            "nombre": "RWANDA",
            "estatus": 1
        },
        {
            "id": 210,
            "nombre": "SABA ISLA",
            "estatus": 1
        },
        {
            "id": 211,
            "nombre": "SALOMON ISLAS",
            "estatus": 1
        },
        {
            "id": 212,
            "nombre": "SAMOA AMERIACANA",
            "estatus": 1
        },
        {
            "id": 213,
            "nombre": "SAMOA OCC.",
            "estatus": 1
        },
        {
            "id": 219,
            "nombre": "SAN BARTOLOME",
            "estatus": 1
        },
        {
            "id": 220,
            "nombre": "SAN CRISTOBAL Y NIEVES",
            "estatus": 1
        },
        {
            "id": 214,
            "nombre": "SAN EUSTAQUIO",
            "estatus": 1
        },
        {
            "id": 215,
            "nombre": "SAN KITTS",
            "estatus": 1
        },
        {
            "id": 216,
            "nombre": "SAN MAARTEN",
            "estatus": 1
        },
        {
            "id": 217,
            "nombre": "SAN MARINO",
            "estatus": 1
        },
        {
            "id": 218,
            "nombre": "SAN PEDRO Y MIGUELON",
            "estatus": 1
        },
        {
            "id": 223,
            "nombre": "SANTA ELENA ISLA",
            "estatus": 1
        },
        {
            "id": 224,
            "nombre": "SANTA LUCIA",
            "estatus": 1
        },
        {
            "id": 227,
            "nombre": "SANTA SEDE / ESTADO DE LA CIUDAD DEL VATICANO",
            "estatus": 1
        },
        {
            "id": 228,
            "nombre": "SANTO TOME Y PRINCIPE",
            "estatus": 1
        },
        {
            "id": 225,
            "nombre": "SANTO TOME Y PRINCIPE REP",
            "estatus": 1
        },
        {
            "id": 221,
            "nombre": "SAN VICENTE Y GRANADINAS",
            "estatus": 1
        },
        {
            "id": 222,
            "nombre": "SAN VICENTE Y LAS GRANADINAS",
            "estatus": 1
        },
        {
            "id": 226,
            "nombre": "SENEGAL",
            "estatus": 1
        },
        {
            "id": 229,
            "nombre": "SERBIA",
            "estatus": 1
        },
        {
            "id": 230,
            "nombre": "SEYCHELLES",
            "estatus": 1
        },
        {
            "id": 231,
            "nombre": "SIERRA LEONA",
            "estatus": 1
        },
        {
            "id": 232,
            "nombre": "SINGAPUR",
            "estatus": 1
        },
        {
            "id": 0,
            "nombre": "SIN PAIS",
            "estatus": 1
        },
        {
            "id": 233,
            "nombre": "SIRIA REP. ARABE",
            "estatus": 1
        },
        {
            "id": 234,
            "nombre": "SOMALIA",
            "estatus": 1
        },
        {
            "id": 235,
            "nombre": "SRI LANKA",
            "estatus": 1
        },
        {
            "id": 236,
            "nombre": "SUAZILANDIA",
            "estatus": 1
        },
        {
            "id": 237,
            "nombre": "SUDAFRICA",
            "estatus": 1
        },
        {
            "id": 238,
            "nombre": "SUDAN",
            "estatus": 1
        },
        {
            "id": 239,
            "nombre": "SUECIA",
            "estatus": 1
        },
        {
            "id": 240,
            "nombre": "SUIZA",
            "estatus": 1
        },
        {
            "id": 241,
            "nombre": "SURINAME",
            "estatus": 1
        },
        {
            "id": 242,
            "nombre": "SWAZILIANDIA",
            "estatus": 1
        },
        {
            "id": 243,
            "nombre": "TAHITI",
            "estatus": 1
        },
        {
            "id": 244,
            "nombre": "TAILANDIA",
            "estatus": 1
        },
        {
            "id": 245,
            "nombre": "TAIWAN",
            "estatus": 1
        },
        {
            "id": 246,
            "nombre": "TANZANIA",
            "estatus": 1
        },
        {
            "id": 247,
            "nombre": "TAYIKISTAN",
            "estatus": 1
        },
        {
            "id": 248,
            "nombre": "TERRITORIO BRITANICO DEL OCEANO INDICO",
            "estatus": 1
        },
        {
            "id": 249,
            "nombre": "TERRITORIOS AUSTRALES FRANCESES",
            "estatus": 1
        },
        {
            "id": 250,
            "nombre": "TERRITORIOS PALESTINOS",
            "estatus": 1
        },
        {
            "id": 251,
            "nombre": "TIMOR ORIENTAL",
            "estatus": 1
        },
        {
            "id": 252,
            "nombre": "TOGO",
            "estatus": 1
        },
        {
            "id": 253,
            "nombre": "TOKELAU",
            "estatus": 1
        },
        {
            "id": 254,
            "nombre": "TONGA",
            "estatus": 1
        },
        {
            "id": 255,
            "nombre": "TONGOLESA",
            "estatus": 1
        },
        {
            "id": 256,
            "nombre": "TRINIDAD Y TOBAGO",
            "estatus": 1
        },
        {
            "id": 257,
            "nombre": "TUNEZ",
            "estatus": 1
        },
        {
            "id": 258,
            "nombre": "TURCAS",
            "estatus": 1
        },
        {
            "id": 259,
            "nombre": "TURKMENISTAN",
            "estatus": 1
        },
        {
            "id": 260,
            "nombre": "TURQUIA",
            "estatus": 1
        },
        {
            "id": 261,
            "nombre": "TUVALU",
            "estatus": 1
        },
        {
            "id": 262,
            "nombre": "UCRANIA",
            "estatus": 1
        },
        {
            "id": 263,
            "nombre": "UGANDA",
            "estatus": 1
        },
        {
            "id": 264,
            "nombre": "URUGUAY",
            "estatus": 1
        },
        {
            "id": 265,
            "nombre": "UZBEKISTAN",
            "estatus": 1
        },
        {
            "id": 266,
            "nombre": "VANUATU",
            "estatus": 1
        },
        {
            "id": 267,
            "nombre": "VENEZUELA",
            "estatus": 1
        },
        {
            "id": 268,
            "nombre": "VIETNAM",
            "estatus": 1
        },
        {
            "id": 271,
            "nombre": "VIRGENES BRITANICAS ISLAS",
            "estatus": 1
        },
        {
            "id": 269,
            "nombre": "VIRGENES Is. (E.U.A,1);",
            "estatus": 1
        },
        {
            "id": 270,
            "nombre": "WALLIS Y FUTUNA",
            "estatus": 1
        },
        {
            "id": 272,
            "nombre": "YEMEN",
            "estatus": 1
        },
        {
            "id": 273,
            "nombre": "YIBUTI",
            "estatus": 1
        },
        {
            "id": 274,
            "nombre": "YUGOSLAVIA",
            "estatus": 1
        },
        {
            "id": 275,
            "nombre": "ZAIRE",
            "estatus": 1
        },
        {
            "id": 276,
            "nombre": "ZAMBIA",
            "estatus": 1
        },
        {
            "id": 277,
            "nombre": "ZIMBABWE",
            "estatus": 1
        }
    ],
    "correlationId": ""
}




      `));
    }
}

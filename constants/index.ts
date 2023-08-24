import { IServer, IBoss } from "../types"

import Archon from '~/assets/bosses/Arhon.png'
import AlfaSamez from '~/assets/bosses/Alfasamec.png'
import Basbaky from '~/assets/bosses/Basbakylynci.png'
import BogatyiYp from '~/assets/bosses/BogatiyUpur.png'
import Voko from '~/assets/bosses/hjogo.png'
import gigTortola from '~/assets/bosses/GiganskaiaTortola.png'
import Destruktor from '~/assets/bosses/Destruktor.png'
import DrevniyEnt from '~/assets/bosses/DrevniyEnt.png'
import DengurKrov from '~/assets/bosses/Dengur.png'
import Zveromor from '~/assets/bosses/Everemor.png'
import ZototoyScarabei from '~/assets/bosses/ZolotoySkarabey.png'
import ZolotoyTarakan from '~/assets/bosses/ZolotoyTarakan.png'
import KorolevaKrus from '~/assets/bosses/KorolevaKrys.png'
import KorolevaTermitov from '~/assets/bosses/RorolevaTermitov.png'
import KorolevaTernia from '~/assets/bosses/KorolevaTernaria.png'
import KorolevskiyPayk from '~/assets/bosses/KorolevskiyZhyk.png'
import Plaimaruk from '~/assets/bosses/Plamiaruk.png'
import SovetnikOstina from '~/assets/bosses/SovetnikOstina.png'
import SamkaZhyka from '~/assets/bosses/KorolevaZhyga.png'
import TemniyOrakul from '~/assets/bosses/TemnuiOrakul.png'
import TemnuiShaman from '~/assets/bosses/TemnuiShaman.png'
import Faraon from '~/assets/bosses/Faraon.png'
import Hygo from '~/assets/bosses/hjogo.png'
import Hozain from '~/assets/bosses/Hozain.png'
import Edvard from '~/assets/bosses/Edvard.png'
import Elenium from '~/assets/bosses/Elenium.png'
import Mozemium from '~/assets/bosses/Mozemiun.png' 

export const servers: IServer[] = [
    {
        id: 0,
        name: 'Гранас',
    },

    {
        id: 1,
        name: 'Энигма',
    },

    {
        id: 2,
        name: 'Логрус',
    },
]

export const Bosses: IBoss[] = [
    {
        id: 0,
        name: "Архон",
        text: "Обитает: муждуречье *в месте мрачном и пустынном, отец злодеяния сплетает свои сети",
        image: Archon,
        time: {
            hours: 4,
            minutes: 5
        }
    },

    {
        id: 1,
        name: "Альфа Самец(Вор)",
        text: "Обитает: Ворлакс",
        image: AlfaSamez,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 2,
        name: "Альфа Самец(Лес)",
        text: "Обитает: Волчьи Ямы",
        image: AlfaSamez,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 3,
        name: "Альфа Самец(Ямы)",
        text: "Обитает: Лес Морры",
        image: AlfaSamez,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 4,
        name: "Баксбакуал ануксивайе",
        text: "Обитает:Берега битв *грохот и рычание сотресают вековечные льды и снега, похоже там проснулься кто-то очень голодный*",
        image: Basbaky,
        time: {
            hours: 5,
            minutes: 5
        }
    },

    {
        id: 5,
        name: "Богатый Упырь(Ворлакс)",
        text: "Обитает: катакомбы контрабандистов",
        image: BogatyiYp,
        time: {
            hours: 1,
            minutes: 10
        }
    },

    {
        id: 6,
        name: "Богатый Упырь (Каталания)",
        text: "Обитает: небольшой склеп",
        image: BogatyiYp,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 7,
        name: "Богатый Упырь(Лес)",
        text: "Обитает: небольшой склеп",
        image: BogatyiYp,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    
    {
        id: 8,
        name: "Воко",
        text: "Обитает:Обиталище Воко *Заиндевевшие клешни царапают старый лед... Обледенелый панцирь обдирает своды промерзлой пещеры... Царь северных гор жаждет новых душ!*",
        image: Voko,
        time: {
            hours: 10,
            minutes: 5
        }
    },

    {
        id: 9,
        name: "Гиганская Тортола",
        text: "Обитает:Трогул *Древнее зло пробудилось, но лишь стражник Алнора видит его.*",
        image: gigTortola,
        time: {
            hours: 5,
            minutes: 5
        }
    },

    {
        id: 10,
        name: "Деструктор",
        text: "Обитает:Пустыня мара *Пустыня осенена знаком ворона у склонов пирамиды.*",
        image: Destruktor,
        time: {
            hours: 5,
            minutes: 5
        }
    },

    {
        id: 11,
        name: "Древний Энт",
        text: "Обитает: Каталания *Древний лес наступает на литанский замок*",
        image: DrevniyEnt,
        time: {
            hours: 1,
            minutes: 28
        }
    },

    {
        id: 12,
        name: "Денгур Кровавый",
        text: "Обитает: Чертог Кровавого Топора *Над морозным краем,покрытый снегом, разлетаеться звон стальных лезвий. Кто-то яростно и громко бьет двумя топорами, сотрясая землю.*",
        image: DengurKrov,
        time: {
            hours: 5,
            minutes: 5
        }
    },

    {
        id: 13,
        name: "Зверомор",
        text: "Обитает: Мушрум *Грибы подняли восстание, и неспроста*",
        image: Zveromor,
        time: {
            hours: 4,
            minutes: 5
        }
    },

    {
        id: 14,
        name: "Золотой Скарабей (пир.1)",
        text: "Обитает:Пирамида 1-й этаж",
        image: ZototoyScarabei,
        time: {
            hours: 0,
            minutes: 30
        }
    },

    {
        id: 15,
        name: "Золотой Скарабей (пир.2)",
        text: "Обитает:Пирамида 2-й этаж",
        image: ZototoyScarabei,
        time: {
            hours: 0,
            minutes: 30
        }
    },

    {
        id: 16,
        name: "Золотой Таракан",
        text: "Обитает: катакомбы 3-й",
        image: ZolotoyTarakan,
        time: {
            hours: 2,
            minutes: 0
        }
    },


    {
        id: 17,
        name: "Королева Крыс",
        text: "Обитает: катакомбы 3-й этаж *У Борга Харигана снова болит голова, удивительно почему-же.*",
        image: KorolevaKrus,
        time: {
            hours: 2,
            minutes: 5
        }
    },

    {
        id: 18,
        name: "Королева термитов",
        text: "Обитает: Заброшенные шахты. -1-й этаж",
        image: KorolevaTermitov,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 19,
        name: "Королевская Терния",
        text: "Обитает: Элгор",
        image: KorolevaTernia,
        time: {
            hours: 1,
            minutes: 57
        }
    },

    {
        id: 20,
        name: "Королевский паук",
        text: "Обитает: Подземелье паутины",
        image: KorolevskiyPayk,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 21,
        name: "Пламярык",
        text: "Обитает: Прииск",
        image: Plaimaruk,
        time: {
            hours: 4,
            minutes: 0
        }
    },

    {
        id: 22,
        name: "Советник Остина",
        text: "Обитает:Поселение Розбойников",
        image: SovetnikOstina,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 23,
        name: "Самка Жужа",
        text: "Обитает:Иллаир",
        image: SamkaZhyka,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 24,
        name: "Темный оракул",
        text: "Обитает: Пирамида 2-й этаж",
        image: TemniyOrakul,
        time: {
            hours: 1,
            minutes: 0
        }
    },

    {
        id: 25,
        name: "Тёмный шаман",
        text: "Обитает:Элгор *тыква старины Тью под угрозой!",
        image: TemnuiShaman,
        time: {
            hours: 3,
            minutes: 25
        }
    },

    {
        id: 26,
        name: "Фараон",
        text: "Обитает: Пирамида 2-й этаж",
        image: Faraon,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 27,
        name: "Хьюго",
        text: "Обитает:Берега битв *Молоторукий в землях севера сулит унижения слабым.",
        image: Hygo,
        time: {
            hours: 5,
            minutes: 5
        }
    },

    {
        id: 28,
        name: "Хозяин (кук. 1)",
        text: "Обитает: Особняк Кукольника. 1-й этаж.",
        image: Hozain,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 29,
        name: "Хозяин (кук. 2)",
        text: "Обитает: Особняк Кукольника. 2-й этаж.",
        image: Hozain,
        time: {
            hours: 2,
            minutes: 0
        }
    },

    {
        id: 30,
        name: "Эдвард",
        text: "Обитает:Особняк Кукольника.2-й этаж *Снова будет много лезвий и бритвенной пены.*",
        image: Edvard,
        time: {
            hours: 4,
            minutes: 5
        }
    },

    {
        id: 31,
        name: "Превосходный пожиратель элениума",
        text: "",
        image: Elenium,
        time: {
            hours: 2,
            minutes: 26
        }
    },

    {
        id: 32,
        name: "Превосходный пожиратель моземия",
        text: "",
        image: Mozemium,
        time: {
            hours: 2,
            minutes: 46
        }
    },

]
import { Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MarathiService } from './marathi.service';

interface Song {
  id: string
  name: string
  lyrics_marathi?: string
  lyrics_english: string
  meaning?: string
  singer: string
  lyricist: string
  tags: string[]
  musicLinks?: {
    spotify?: string
    youtube?: string
    jiosaavn?: string
    gaana?: string
  }
  startLetter: string;
}

interface Aarti {
  id: string
  name: string
  deity: string
  lyrics_marathi: string
  lyrics_english: string
  tags: string[]
}
const sampleSongs: Song[] = [
  {
    id: "1",
    startLetter: 'अ',
    name: "अबोली",
    lyrics_marathi: `अबोली माझी माळावरती फुलली
सुगंध तिचा दरवळला
अबोली माझी माळावरती फुलली

पाहुनी तिला मन माझे भुलले
भावना मनी दाटल्या
अबोली माझी माळावरती फुलली`,
    lyrics_english: `Aboli majhi maalavrati phulali
Sugandh ticha darvalala
Aboli majhi maalavrati phulali

Pahuni tila man majhe bhulale
Bhavana mani datalya
Aboli majhi maalavrati phulali`,
    meaning:
      "This song describes the beauty of the Aboli flower (Firecracker Flower) blooming on a hill and how its fragrance spreads everywhere, captivating the heart of the observer.",
    singer: "लता मंगेशकर",
    lyricist: "ग. दि. माडगूळकर",
    tags: ["भावगीत", "निसर्ग"],
  },
  {
    id: "2",
    name: "आता तुझ्या रंगात",
    startLetter: 'आ',
    lyrics_marathi: `आता तुझ्या रंगात रंगले मन
आता तुझ्या रंगात रंगले मन
तुझ्या प्रेमात भिजले तन
आता तुझ्या रंगात रंगले मन`,
    lyrics_english: `Aata tujhya rangat rangale man
Aata tujhya rangat rangale man
Tujhya premat bhijale tan
Aata tujhya rangat rangale man`,
    singer: "अजय गोगावले",
    lyricist: "मंगेश पाडगावकर",
    tags: ["प्रेमगीत", "भावगीत"],
  },
  {
    id: "3",
    name: "कसा काय पाऊस पडतो",
    startLetter: "क",
    lyrics_marathi: `क��ा काय पाऊस पडतो
कसा काय पाऊस पडतो
कसा काय पाऊस पडतो
कसा काय पाऊस पडतो

पावसाचे थेंब पडती
झाडांवरती छपरांवरती
पावसाचे थेंब पडती
झाडांवरती छपरांवरती`,
    lyrics_english: `Kasa kay paus padato
Kasa kay paus padato
Kasa kay paus padato
Kasa kay paus padato

Pavsache themb padati
Jhadanvarati chhaparanvarati
Pavsache themb padati
Jhadanvarati chhaparanvarati`,
    singer: "सुरेश वाडकर",
    lyricist: "शांता शेळके",
    tags: ["बालगीत", "निसर्ग"],
  },
  {
    id: "4",
    name: "तू आहेस तशी",
    startLetter: 'त',
    lyrics_marathi: `तू आहेस तशी, तू आहेस तशी
तू आहेस तशी, तू आहेस तशी
तू आहेस तशी, तू आहेस तशी
तू आहेस तशी, तू आहेस तशी

तुझ्या डोळ्यांमध्ये, तुझ्या हसण्यामध्ये
तुझ्या बोलण्यामध्ये, तुझ्या चालण्यामध्ये
तू आहेस तशी, तू आहेस तशी`,
    lyrics_english: `Tu aahes tashi, tu aahes tashi
Tu aahes tashi, tu aahes tashi
Tu aahes tashi, tu aahes tashi
Tu aahes tashi, tu aahes tashi

Tujhya dolyamadhe, tujhya hasanyamadhe
Tujhya bolanyamadhe, tujhya chalanyamadhe
Tu aahes tashi, tu aahes tashi`,
    meaning:
      "This song celebrates accepting someone exactly as they are, appreciating their authentic self in every aspect - from their eyes to their smile, their words to their walk.",
    singer: "अनिकेत विश्वासराव",
    lyricist: "मंगेश कांगणे",
    tags: ["प्रेमगीत", "आधुनिक"],
  },
  {
    id: "5",
    startLetter: 'भ',
    name: "भेटली तुला",
    lyrics_marathi: `भेटली तुला मी जेव्हा जेव्हा
भेटली तुला मी जेव्हा जेव्हा
मनात माझ्या गुलाब फुलला
भेटली तुला मी जेव्हा जेव्हा`,
    lyrics_english: `Bhetali tula mi jevha jevha
Bhetali tula mi jevha jevha
Manat majhya gulab phulala
Bhetali tula mi jevha jevha`,
    singer: "अविनाश साठे",
    lyricist: "संदीप खरे",
    tags: ["प्रेमगीत", "चित्रपट"],
  },
]

// Sample Aarti data
const sampleAartis: Aarti[] = [
  {
    id: "1",
    name: "गणपती आरती",
    deity: "श्री गणेश",
    lyrics_marathi: `सुखकर्ता दुःखहर्ता वार्ता विघ्नाची
नुरवी पुरवी प्रेम कृपा जयाची
सर्वांगी सुंदर उटी शेंदुराची
कंठी झळके माळ मुक्ताफळांची

जय देव जय देव जय मंगलमूर्ती
दर्शनमात्रे मन:कामना पुरती`,
    lyrics_english: `Sukhakarta Dukhharta Varta Vighnachi
Nurvi Purvi Prem Krupa Jayachi
Sarvangee Sundar Uti Shendurachi
Kanthi Zalake Maal Muktaphalachi

Jay Dev Jay Dev Jay Mangalmurti
Darshanamatre Manakamana Purti`,
    tags: ["गणेश", "आरती"],
  },
  {
    id: "2",
    name: "शिव आरती",
    deity: "भगवान शिव",
    lyrics_marathi: `लवथवती विक्राळा ब्रह्मांडी माळा
त्याचिया मिरवती मुखी बाळ काळा
भस्मांगी भुजंग लपेती अंगी
नागजणित मुकुट शोभतो त्यालागी

ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा
ब्रह्मा विष्णु सदाशिव, अर्धांगी पार्वती`,
    lyrics_english: `Lavthavati Vikrala Brahmandi Mala
Tyachiya Miravati Mukhi Bal Kala
Bhasmangi Bhujang Lapeti Angi
Nagjanit Mukut Shobhato Tyalagi

Om Jay Shiv Omkara, Swami Jay Shiv Omkara
Brahma Vishnu Sadashiv, Ardhangi Parvati`,
    tags: ["शिव", "आरती"],
  },
  {
    id: "3",
    name: "विठ्ठल आरती",
    deity: "श्री विठ्ठल",
    lyrics_marathi: `येई हो विठ्ठले माझे माऊली येई हो
तुझ्या दर्शनासाठी जीव तळमळतो पाही
येई हो विठ्ठले माझे माऊली येई हो

पंढरीचा वाळवंट धाव घेई वेगी
तुझ्या भेटीसाठी उभा आहे मी मार्गी
येई हो विठ्ठले माझे माऊली येई हो`,
    lyrics_english: `Yei Ho Vitthale Majhe Mauli Yei Ho
Tujhya Darshanasathi Jiv Talmalato Pahi
Yei Ho Vitthale Majhe Mauli Yei Ho

Pandharichya Valvant Dhav Ghei Vegi
Tujhya Bhetisathi Ubha Aahe Mi Margi
Yei Ho Vitthale Majhe Mauli Yei Ho`,
    tags: ["विठ्ठल", "आरती", "पंढरपूर"],
  },
]

@Controller('marathi')
export class MarathiController {
  constructor(
    private readonly marathiService: MarathiService,
  ) { }


  @Get('/aarti')
  getAarti() {
    return sampleAartis;
  }
  @Get('/aarti/:id')
  getAartiById(@Param('id') id: string) {
    const aarti = sampleAartis.find(aarti => aarti.id === id);
    if (!aarti) {
      throw new NotFoundException('Aarti not found');
    }
    return aarti;
  }

  @Post('/aarti')
  addAarti() {
    return sampleAartis;
  }

  @Put('/aarti/:id')
  updateAarti(@Param('id') id: string) {
    return sampleAartis;
  }

  @Delete('/aarti/:id')
  deleteAarti(@Param('id') id: string) {
    return sampleAartis;
  }

  @Get('/song')
  getSong() {
    return sampleSongs;
  }


  @Post('/song')
  addSong() {
    return sampleSongs;
  }

  @Get('/song/:id')
  getSongById() {
    return sampleSongs;
  }
  @Put('/song/:id')
  updateSong() {
    return sampleSongs;
  }
  @Delete('/song/:id')
  deleteSong() {
    return sampleSongs;
  }
}

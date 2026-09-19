// src/i18n/translations.ts
//
// Single source of truth for every bit of copy that changes between
// English and Thai. Things that stay the same in both languages on
// purpose are NOT in here - they're left as plain strings in the
// components/data files that use them:
//   - proper nouns: company names, certificate/course titles, people's
//     names, institution names, social handles
//   - tech-stack terms (HTML, CSS, TypeScript, SQL, ...)
//   - status-badge words (LIVE, LOCKED, ENTERED, COMPLETE, PLANNED,
//     ACTIVE, INACTIVE, IN PROGRESS) - these read as game-HUD chips
//   - the "> XXX" terminal-style section eyebrows sprinkled through the
//     site (e.g. "> WHO AM I", "> DISTRICT MAP") - kept English on
//     purpose, like real terminal output always is
//   - the "PANDEV" wordmark, "PANDEV - SAVE FILE 001" watermark, "OG
//     SHEET" and "PRESS START" - brand/arcade-convention terms
//
// Everything else - headings, nav labels, dialogue, descriptions,
// buttons, aria-labels, placeholders - lives here.

export type Lang = "en" | "th";

export const translations = {
  en: {
    nav: {
      titleScreen: "Title Screen",
      characterSelect: "Character Select",
      levelSelect: "Level Select",
      questLog: "Quest Log",
      saveContinue: "Save & Continue",
      memoryLane: "Memory Lane",
      graduation: "Graduation",
      muteOn: "Mute background music",
      muteOff: "Unmute background music",
      switchToThai: "Switch site language to Thai",
      switchToEnglish: "Switch site language to English",
      menu: "MENU",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      selectLevel: "SELECT A LEVEL",
      tapToClose: "tap anywhere to close",
    },
    bootGreeting: {
      dialogue: {
        zero: "...",
        first: "Oh who tf are u?",
        second:
          "Ohhhh u are my visitor to check my portfolio, I'm glad someone finally notice me HI!?!?",
        third:
          "But hey, if u here, u can check my portfolio to see what project I'm currently developing and what's my favorite tech stack.",
        fourth: "Ps it's TypeScript.",
        fifth: "Okay I'm wasting ur guys time, hope u enjoyed my portfolio.",
        six: "I guess haha.",
      },
      skip: "SKIP >>",
      clickToStart: "CLICK TO START",
    },
    loadingScreen: {
      subtitle: "Sup, welcome to my portfolio",
      status: "LOADING ASSETS",
      footer: "NO BUGS WERE HARMED (PROBABLY)",
    },
    titleScreen: {
      eyebrow: "TITLE SCREEN",
    },
    home: {
      whoAmIBio:
        "Marketing student at Bangkok University, self-teaching full-stack dev on the side. Not choosing between business and code - building the bridge between them.",
      currentlyRunningDescriptions: {
        "allaround-gdp": "3D globe GDP visualizer",
        "lofi-calculator": "Lofi calculator with a currency converter",
        "portfolio-site": "This site - pixel art RPG portfolio",
      },
      districtMap: {
        enter: "ENTER",
        items: {
          "/about": {
            name: "CHARACTER SELECT",
            teaser: "Who I am, what I'm learning",
          },
          "/projects": {
            name: "LEVEL SELECT",
            teaser: "What I've built so far",
          },
          "/contact": {
            name: "SAVE & CONTINUE",
            teaser: "Let's talk",
          },
        },
      },
      transmissionCta:
        "If you have read this far, might as well say hi. Pick a channel below.",
    },
    about: {
      heading: "STATS",
      switchToPixel: "SWITCH TO PIXEL",
      switchToReal: "SWITCH TO REAL",
      swot: {
        STRENGTH: "STRENGTH",
        WEAKNESS: "WEAKNESS",
        OPPORTUNITY: "OPPORTUNITY",
        THREAT: "THREAT",
      },
      profileLabels: {
        NAME: "NAME",
        BORN: "BORN",
        INTERESTS: "INTERESTS",
        HOBBIES: "HOBBIES",
      },
      profileValues: {
        NAME: "Pannadhorn Rugseree",
        BORN: "6 July 2005",
        INTERESTS:
          "Marketing Analyst, Data Analyst, Marketing Management, and more",
        HOBBIES: "Swimming, upskill learning, playing video games",
      },
      ogSheet: "OG SHEET",
    },
    graduation: {
      heading: "GRADUATION",
      subtitle: "Academic record",
      types: {
        SCHOOL: "SCHOOL",
        UNIVERSITY: "UNIVERSITY",
      },
    },
    projects: {
      heading: "PROJECTS",
      descriptions: {
        "Lofi Calculator": "Lofi-themed calculator with a currency converter",
        "ALLAround-GDP": "3D globe GDP visualizer",
        "Wally the Wallet": "Personal finance tracker - still in the vault.",
      },
    },
    contact: {
      heading: "CONTACT",
      calloutText:
        "Always open to a conversation about analytics, marketing, code, or all three at once.",
    },
    competition: {
      heading: "QUEST LOG",
      tagline: "Track your journey. Complete challenges. Earn your achievements.",
      categories: {
        "boss-battles": "BOSS BATTLES",
        "completed-quests": "COMPLETED QUESTS",
        "planned-quests": "PLANNED QUESTS",
        "side-quests": "SIDE QUESTS",
      },
      questNotes: {
        "Workshop format with a case round": "Workshop format with a case round",
        "Entered twice": "Entered twice",
        "Workshop format": "Workshop format",
        Coursera: "Coursera",
        "Certificate recovered": "Certificate recovered",
        "Exam planned": "Exam planned",
        "Not started": "Not started",
        "Expected late this year": "Expected late this year",
        "2025": "2025",
        "Vanderbilt University, via Coursera":
          "Vanderbilt University, via Coursera",
      },
      yourProgress: "YOUR PROGRESS",
    },
    memoryLane: {
      heading: "MEMORY LANE",
      subtitle: "Scroll sideways, or use the arrows - one star at a time.",
      labels: {
        "THE BEGINNING": "THE BEGINNING",
        KINDERGARTEN: "KINDERGARTEN",
        "PRIMARY SCHOOL": "PRIMARY SCHOOL",
        "HIGH SCHOOL": "HIGH SCHOOL",
        UNIVERSITY: "UNIVERSITY",
      },
      photoComingSoon: "[ photo coming soon ]",
      photo: "[ photo ]",
      previousMemory: "Previous memory",
      nextMemory: "Next memory",
    },
  },
  th: {
    nav: {
      titleScreen: "ไตเติ้ลสกรีน",
      characterSelect: "เลือกตัวละคร",
      levelSelect: "เลือกด่าน",
      questLog: "บันทึกภารกิจ",
      saveContinue: "เซฟ & ติดต่อ",
      memoryLane: "เส้นทางความทรงจำ",
      graduation: "จบการศึกษา",
      muteOn: "ปิดเสียงเพลงพื้นหลัง",
      muteOff: "เปิดเสียงเพลงพื้นหลัง",
      switchToThai: "เปลี่ยนภาษาเว็บเป็นภาษาไทย",
      switchToEnglish: "เปลี่ยนภาษาเว็บเป็นภาษาอังกฤษ",
      menu: "เมนู",
      openMenu: "เปิดเมนู",
      closeMenu: "ปิดเมนู",
      selectLevel: "เลือกด่าน",
      tapToClose: "แตะที่ใดก็ได้เพื่อปิด",
    },
    bootGreeting: {
      dialogue: {
        zero: "...",
        first: "เห้ย ใครวะเนี่ย",
        second:
          "โอ้ววว มาดูพอร์ตโฟลิโอเราเหรอ ในที่สุดก็มีคนสนใจเราซะที ไฮ!?!?",
        third:
          "แต่เอาจริง ๆ ถ้ามาถึงตรงนี้แล้ว ลองดูพอร์ตนี้ได้เลย จะได้เห็นว่าตอนนี้เรากำลังทำโปรเจกต์อะไรอยู่ แล้วก็เทคสแต็กที่เราชอบที่สุด",
        fourth: "ปล. คือ TypeScript นะ",
        fifth: "โอเค เราเสียเวลาทุกคนพอแล้ว หวังว่าจะชอบพอร์ตนี้นะ",
        six: "มั้ง ฮ่าๆ",
      },
      skip: "ข้าม >>",
      clickToStart: "คลิกเพื่อเริ่ม",
    },
    loadingScreen: {
      subtitle: "ว่าไง ยินดีต้อนรับสู่พอร์ตโฟลิโอของเรา",
      status: "กำลังโหลดข้อมูล",
      footer: "ไม่มีบั๊กตัวไหนเจ็บ (มั้ง)",
    },
    titleScreen: {
      eyebrow: "ไตเติ้ลสกรีน",
    },
    home: {
      whoAmIBio:
        "นักศึกษาการตลาดที่มหาวิทยาลัยกรุงเทพ ที่สอนตัวเองเขียนโค้ด full-stack ไปด้วย ไม่ได้เลือกระหว่างสายธุรกิจกับสายโค้ด แต่กำลังสร้างสะพานเชื่อมทั้งสองฝั่ง",
      currentlyRunningDescriptions: {
        "allaround-gdp": "แอปแสดงข้อมูล GDP บนลูกโลก 3 มิติ",
        "lofi-calculator": "เครื่องคิดเลขสไตล์ Lofi พร้อมตัวแปลงสกุลเงิน",
        "portfolio-site": "เว็บนี้แหละ พอร์ตโฟลิโอสไตล์ RPG พิกเซลอาร์ต",
      },
      districtMap: {
        enter: "เข้า",
        items: {
          "/about": {
            name: "เลือกตัวละคร",
            teaser: "ฉันเป็นใคร กำลังเรียนรู้อะไรอยู่",
          },
          "/projects": {
            name: "เลือกด่าน",
            teaser: "สิ่งที่สร้างมาจนถึงตอนนี้",
          },
          "/contact": {
            name: "เซฟ & ติดต่อ",
            teaser: "มาคุยกัน",
          },
        },
      },
      transmissionCta:
        "ถ้าอ่านมาถึงตรงนี้แล้ว ทักมาทักทายกันหน่อยก็ได้ เลือกช่องทางด้านล่างได้เลย",
    },
    about: {
      heading: "สเตตัส",
      switchToPixel: "สลับเป็นพิกเซล",
      switchToReal: "สลับเป็นภาพจริง",
      swot: {
        STRENGTH: "จุดแข็ง",
        WEAKNESS: "จุดอ่อน",
        OPPORTUNITY: "โอกาส",
        THREAT: "อุปสรรค",
      },
      profileLabels: {
        NAME: "ชื่อ",
        BORN: "เกิด",
        INTERESTS: "ความสนใจ",
        HOBBIES: "งานอดิเรก",
      },
      profileValues: {
        NAME: "Pannadhorn Rugseree",
        BORN: "6 กรกฎาคม 2005",
        INTERESTS: "นักวิเคราะห์การตลาด, นักวิเคราะห์ข้อมูล, การจัดการการตลาด และอื่น ๆ",
        HOBBIES: "ว่ายน้ำ, เรียนรู้เพิ่มทักษะ, เล่นวิดีโอเกม",
      },
      ogSheet: "OG SHEET",
    },
    graduation: {
      heading: "จบการศึกษา",
      subtitle: "ประวัติการศึกษา",
      types: {
        SCHOOL: "โรงเรียน",
        UNIVERSITY: "มหาวิทยาลัย",
      },
    },
    projects: {
      heading: "โปรเจกต์",
      descriptions: {
        "Lofi Calculator": "เครื่องคิดเลขธีม Lofi พร้อมตัวแปลงสกุลเงิน",
        "ALLAround-GDP": "แอปแสดงข้อมูล GDP บนลูกโลก 3 มิติ",
        "Wally the Wallet": "แอปติดตามการเงินส่วนตัว - ยังอยู่ในตู้เซฟ",
      },
    },
    contact: {
      heading: "ติดต่อ",
      calloutText:
        "พร้อมคุยเรื่อง analytics การตลาด หรือโค้ดเสมอ จะคุยทีเดียวทั้งสามเรื่องก็ได้",
    },
    competition: {
      heading: "บันทึกภารกิจ",
      tagline: "ติดตามเส้นทางของตัวเอง ผ่านความท้าทายต่าง ๆ และปลดล็อกความสำเร็จ",
      categories: {
        "boss-battles": "ศึกบอส",
        "completed-quests": "ภารกิจที่สำเร็จ",
        "planned-quests": "ภารกิจที่วางแผนไว้",
        "side-quests": "ภารกิจเสริม",
      },
      questNotes: {
        "Workshop format with a case round": "รูปแบบเวิร์กช็อป มีรอบเคสด้วย",
        "Entered twice": "สมัครไปสองครั้ง",
        "Workshop format": "รูปแบบเวิร์กช็อป",
        Coursera: "Coursera",
        "Certificate recovered": "กู้ใบเซอร์กลับมาได้",
        "Exam planned": "วางแผนสอบไว้",
        "Not started": "ยังไม่เริ่ม",
        "Expected late this year": "คาดว่าจะได้ปลายปีนี้",
        "2025": "2025",
        "Vanderbilt University, via Coursera": "Vanderbilt University ผ่าน Coursera",
      },
      yourProgress: "ความคืบหน้าของคุณ",
    },
    memoryLane: {
      heading: "เส้นทางความทรงจำ",
      subtitle: "เลื่อนไปด้านข้าง หรือกดลูกศรก็ได้ ไปทีละดาว",
      labels: {
        "THE BEGINNING": "จุดเริ่มต้น",
        KINDERGARTEN: "อนุบาล",
        "PRIMARY SCHOOL": "ประถมศึกษา",
        "HIGH SCHOOL": "มัธยมศึกษา",
        UNIVERSITY: "มหาวิทยาลัย",
      },
      photoComingSoon: "[ รูปกำลังจะมา ]",
      photo: "[ รูป ]",
      previousMemory: "ความทรงจำก่อนหน้า",
      nextMemory: "ความทรงจำถัดไป",
    },
  },
} as const;

export type Translations = typeof translations.en;

import Images from './db_img.jsx';

const npcImageStyle = {
    mom:{
        blackDress:{
            external:{
                external_blackDress_relaxPose:Images.npc.mom.external_blackDress_relaxPose,
                external_blackDress_smile:Images.npc.mom.external_blackDress_smile,
            },
            interior:{
                rage:Images.npc.mom.iterior_blackDress_rage,
                annoyed:Images.npc.mom.iterior_blackDress_annoyed,
                sad:Images.npc.mom.iterior_blackDress_sad,
                norm:Images.npc.mom.iterior_blackDress_norm,
                goodMood:Images.npc.mom.iterior_blackDress_goodMood,
                joy:Images.npc.mom.iterior_blackDress_joy,
            }
        },
        whitePanties:{
            external:{
                external_blackDress_relaxPose:Images.npc.mom.external_whitePanties_looking,
            },
            interior:{
                rage:Images.npc.mom.iterior_whitePanties_rage,
                annoyed:Images.npc.mom.iterior_whitePanties_annoyed,
                sad:Images.npc.mom.iterior_whitePanties_sad,
                norm:Images.npc.mom.iterior_whitePanties_norm,
                goodMood:Images.npc.mom.iterior_whitePanties_goodMood,
                joy:Images.npc.mom.iterior_whitePanties_joy,
            }
        },
        blackPanties:{
            external:{
                external_blackPanties_back:Images.npc.mom.external_blackPanties_back,
            },
            interior:{
                rage:Images.npc.mom.interior_blackPanties_rage,
                annoyed:Images.npc.mom.interior_blackPanties_annoyed,
                sad:Images.npc.mom.interior_blackPanties_sad,
                norm:Images.npc.mom.interior_blackPanties_norm,
                goodMood:Images.npc.mom.interior_blackPanties_goodMood,
                joy:Images.npc.mom.interior_blackPanties_joy,
            }
        },
    },

    principal:{
        blueShirt:{
            external:{
                external_seetOnTheTable:Images.npc.principal.blueShirt_external1,
            },
            interior:{
                rage:Images.npc.principal.blueShirt_interiorSad,
                annoyed:Images.npc.principal.blueShirt_interiorSad,
                sad:Images.npc.principal.blueShirt_interiorNorm,
                norm:Images.npc.principal.blueShirt_interiorNorm,
                goodMood:Images.npc.principal.blueShirt_interiorJoy,
                joy:Images.npc.principal.blueShirt_interiorJoy,

                reactionBad:Images.npc.principal.blueShirt_interiorReactionBad,
                reactionGood:Images.npc.principal.blueShirt_interiorReactionGood,
            }
        }
    },

    librarian:{
        blueSkirt:{
            external:{
                external1:Images.npc.librarian.bkueSkirt.external1,
            },
            interior:{
                rage:Images.npc.librarian.bkueSkirt.interiorSad,
                annoyed:Images.npc.librarian.bkueSkirt.interiorSad,
                sad:Images.npc.librarian.bkueSkirt.interiorNorm,
                norm:Images.npc.librarian.bkueSkirt.interiorNorm,
                goodMood:Images.npc.librarian.bkueSkirt.interiorGoodMood,
                joy:Images.npc.librarian.bkueSkirt.interiorGoodMood,

                reactionBad:Images.npc.librarian.bkueSkirt.interiorReactionBad,
                reactionGood:Images.npc.librarian.bkueSkirt.interiorReactionGood,
            }
        }
    },

    nurse:{
        jeansShorts:{
            external:{
                external1:Images.npc.nurse.jeansShorts.external1,
            },
            interior:{
                rage:Images.npc.nurse.jeansShorts.interiorSad,
                annoyed:Images.npc.nurse.jeansShorts.interiorSad,
                sad:Images.npc.nurse.jeansShorts.interiorNorm,
                norm:Images.npc.nurse.jeansShorts.interiorNorm,
                goodMood:Images.npc.nurse.jeansShorts.interiorGoodMood,
                joy:Images.npc.nurse.jeansShorts.interiorGoodMood,

                reactionBad:Images.npc.nurse.jeansShorts.interiorReactionBad,
                reactionGood:Images.npc.nurse.jeansShorts.interiorReactionGood,
            }
        }
    }
};

export default npcImageStyle;
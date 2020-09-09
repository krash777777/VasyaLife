import Scenes01 from './scenes/db_scenes_intro.jsx';
import death from './scenes/db_scenes_death.jsx';
import mom from './scenes/db_scenes_mom.jsx';
import mom_blackDress from './scenes/db_scenes_mom_blackDress.jsx';
import mom_whitePanties from './scenes/db_scenes_mom_whitePanties.jsx';
import mom_blackPanties from './scenes/db_scenes_mom_blackPanties.jsx';
import principalInOffice from './scenes/db_scenes_principalInOffice.jsx';
import librarian from './scenes/db_scenes_librarian.jsx';
import nurse from './scenes/db_scenes_nurse.jsx';
import {sleep, doNotWontSleep} from './scenes/db_scenes_sleep.jsx';
import test from './scenes/db_scenes_test.jsx';

//const ScenesGeneral = Scenes01;
const ScenesGeneral = {
    test:test,
    intro:Scenes01,
    sleep:sleep,
    doNotWontSleep:doNotWontSleep,
    death:death,
    mom:mom,
    mom_blackDress:mom_blackDress,
    mom_whitePanties:mom_whitePanties,
    mom_blackPanties:mom_blackPanties,
    principalInOffice:principalInOffice,
    librarian:librarian,
    nurse:nurse,
};

export default ScenesGeneral;
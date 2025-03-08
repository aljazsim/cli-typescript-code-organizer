import { Selector } from 'testcafe';

import Admin from '../../admin-variables';
import App from '../../app-variables';

//! Tests 1 through 16 are not concurrency enabled. Every test after that will be concurrency enabled

// Folders for this Suite
const folder1 = Admin.Navigation.AdvancedForms as App;
const folderOption = Admin.getFolderOption(folder1);
const roleOption = Selector('[id="ZZ Test Cafe-checkbox"]');

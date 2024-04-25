import { ElementNodeGroupConfiguration } from "../../src/configuration/element-node-group-configuration";
import { MemberType } from "../../src/member-type";
import { distinct } from "../../src/helpers/array-helper";
import membersByGroupedMemberType from '../configurations/members-by-grouped-member-type.json';
import membersByIndividualMemberType from '../configurations/members-by-individual-member-type.json';

function parseElementNodeGroupConfiguration(x: any)
{
    let elementNodeGroupConfiguration = new ElementNodeGroupConfiguration();

    elementNodeGroupConfiguration.caption = x.caption;
    elementNodeGroupConfiguration.memberTypes = distinct(x.memberTypes as string[] ?? []).map(y => MemberType[y as keyof typeof MemberType]);
    elementNodeGroupConfiguration.placeAbove = distinct(x.placeAbove as string[] ?? []);
    elementNodeGroupConfiguration.placeBelow = distinct(x.placeBelow as string[] ?? []);

    return elementNodeGroupConfiguration;
}

export const membersByIndividualMemberTypeConfiguration = membersByIndividualMemberType.map((mt: any) => parseElementNodeGroupConfiguration(mt));
export const membersByGroupedMemberTypeConfiguration = membersByGroupedMemberType.map((mt: any) => parseElementNodeGroupConfiguration(mt));
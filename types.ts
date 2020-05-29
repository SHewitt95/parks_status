/**
 * {
    category_id: 2,
    state_name: 'Washington',
    internal_link: 'https://www.nps.gov/olym/planyourvisit/wilderness-trail-conditions.htm#onthisPage-4',
    description: 'The Makah Tribe has closed the Makah Reservation & Shi Shi Beach Trailhead to the general public until further notice (see makah.com). The Quileute Tribe has closed the Quileute Reservation to the general public which includes the Second Beach Trailhead.',
    category: 'Closure',
    park_name: 'Olympic National Park',
    end_date: '',
    start_date: '',
    title: 'Shi Shi Trailhead and Second Beach Trailhead Closures',
    unique_id: '5E9AB472-E0C5-9661-A57E10E0A8C17321',
    site_code: 'olym',
    state_code: [ 'WA' ]
  }
 */

enum Category {
  Danger = 1,
  Closure,
  Caution,
  Information,
}

export interface Item {
  park_name: string;
  site_code: string;
  category_id: Category;
  state_name: string;
  internal_link: string;
  description: string;
  category: string;
  end_date: Date;
  start_date: Date;
  title: string;
  unique_id: string;
  state_code: string[];
}

export interface Status {
  category_id: Category;
  internal_link: string;
  description: string;
  category: string;
  end_date: Date;
  start_date: Date;
  title: string;
  unique_id: string;
}

export interface FormattedItem {
  park_name: string;
  state_name: string;
  state_code: string[];
  statuses: Status[];
}

export interface Props {
  data: Item[];
}

export interface FormattedData {
  [index: string]: FormattedItem;
}

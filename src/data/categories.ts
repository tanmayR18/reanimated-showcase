
type categoryProps = {
    id: string;
    title: string;
    color: string
}

export const categories: categoryProps[] = [
  { id: 'gestures', title: 'Gestures & Physics', color: '#FFD166' },
  { id: 'transitions', title: 'Transitions & Navigation', color: '#06D6A0' },
  { id: 'micro', title: 'Micro - Interactions', color: '#4CC9F0' },
  { id: 'loaders', title: 'Loaders & Feedback', color: '#F72585' },
  { id: 'fun', title: 'Just for Fun 🎉', color: '#FF9F1C' },
  { id: 'experimental', title: 'Advanced & Experimental', color: '#8338EC' },
];
import { Link } from 'react-router';
import { ArrowUpRight, Headphones, Smartphone, Speaker, type LucideIcon } from 'lucide-react';
import type { CategorySummary } from '../../lib/products';
import { routes } from '../../lib/routes';

const icons: Record<string, LucideIcon> = {
  celulares: Smartphone,
  acessorios: Headphones,
  eletronicos: Speaker,
};

interface CategoryShortcutsProps {
  categories: CategorySummary[];
}

export default function CategoryShortcuts({ categories }: CategoryShortcutsProps) {
  return (
    <ul className="category-shortcuts">
      {categories.map((category, i) => {
        const Icon = icons[category.slug] ?? Smartphone;
        return (
          <li key={category.slug}>
            <Link to={routes.category(category.slug)} className="category-shortcut">
              <span className="category-shortcut__index mono">{String(i + 1).padStart(2, '0')}</span>
              <Icon className="category-shortcut__icon" size={26} strokeWidth={1.4} aria-hidden="true" />
              <span className="category-shortcut__name">{category.name}</span>
              <span className="category-shortcut__count mono">
                {category.count} {category.count === 1 ? 'produto' : 'produtos'}
              </span>
              <ArrowUpRight className="category-shortcut__arrow" size={20} aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

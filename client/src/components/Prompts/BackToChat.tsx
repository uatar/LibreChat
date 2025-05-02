import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '~/components/ui';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
import { relativePaths } from '~/routes/RoutePaths';

export default function BackToChat({ className }: { className?: string }) {
  const navigate = useNavigate();
  const localize = useLocalize();
  const clickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0 && !(event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      navigate(relativePaths.newConversation);
    }
  };
  return (
    <a
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      href="/"
      onClick={clickHandler}
    >
      <ArrowLeft className="icon-xs mr-2" />
      {localize('com_ui_back_to_chat')}
    </a>
  );
}

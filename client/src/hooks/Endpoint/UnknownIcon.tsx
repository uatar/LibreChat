import { memo } from 'react';
import { EModelEndpoint, KnownEndpoints } from 'librechat-data-provider';
import { CustomMinimalIcon, XAIcon } from '~/components/svg';
import { IconContext } from '~/common';
import { cn } from '~/utils';
import { basePath } from '~/routes/RoutePaths';

const knownEndpointAssets = {
  [KnownEndpoints.anyscale]: `${basePath}/assets/anyscale.png`,
  [KnownEndpoints.apipie]: `${basePath}/assets/apipie.png`,
  [KnownEndpoints.cohere]: `${basePath}/assets/cohere.png`,
  [KnownEndpoints.deepseek]: `${basePath}/assets/deepseek.svg`,
  [KnownEndpoints.fireworks]: `${basePath}/assets/fireworks.png`,
  [KnownEndpoints.groq]: `${basePath}/assets/groq.png`,
  [KnownEndpoints.huggingface]: `${basePath}/assets/huggingface.svg`,
  [KnownEndpoints.mistral]: `${basePath}/assets/mistral.png`,
  [KnownEndpoints.mlx]: `${basePath}/assets/mlx.png`,
  [KnownEndpoints.ollama]: `${basePath}/assets/ollama.png`,
  [KnownEndpoints.openrouter]: `${basePath}/assets/openrouter.png`,
  [KnownEndpoints.perplexity]: `${basePath}/assets/perplexity.png`,
  [KnownEndpoints.shuttleai]: `${basePath}/assets/shuttleai.png`,
  [KnownEndpoints['together.ai']]: `${basePath}/assets/together.png`,
  [KnownEndpoints.unify]: `${basePath}/assets/unify.webp`,
};

const knownEndpointClasses = {
  [KnownEndpoints.cohere]: {
    [IconContext.landing]: 'p-2',
  },
  [KnownEndpoints.xai]: {
    [IconContext.landing]: 'p-2',
  },
};

const getKnownClass = ({
  currentEndpoint,
  context = '',
  className,
}: {
  currentEndpoint: string;
  context?: string;
  className: string;
}) => {
  if (currentEndpoint === KnownEndpoints.openrouter) {
    return className;
  }

  const match = knownEndpointClasses[currentEndpoint]?.[context] ?? '';
  const defaultClass = context === IconContext.landing ? '' : className;

  return cn(match, defaultClass);
};

function UnknownIcon({
  className = '',
  endpoint: _endpoint,
  iconURL = '',
  context,
}: {
  iconURL?: string;
  className?: string;
  endpoint?: EModelEndpoint | string | null;
  context?: 'landing' | 'menu-item' | 'nav' | 'message';
}) {
  const endpoint = _endpoint ?? '';
  if (!endpoint) {
    return <CustomMinimalIcon className={className} />;
  }

  const currentEndpoint = endpoint.toLowerCase();

  if (currentEndpoint === KnownEndpoints.xai) {
    return (
      <XAIcon
        className={getKnownClass({
          currentEndpoint,
          context: context,
          className,
        })}
      />
    );
  }

  if (iconURL) {
    return <img className={className} src={iconURL} alt={`${endpoint} Icon`} />;
  }

  const assetPath: string = knownEndpointAssets[currentEndpoint] ?? '';

  if (!assetPath) {
    return <CustomMinimalIcon className={className} />;
  }

  return (
    <img
      className={getKnownClass({
        currentEndpoint,
        context: context,
        className,
      })}
      src={assetPath}
      alt={`${currentEndpoint} Icon`}
    />
  );
}

export default memo(UnknownIcon);

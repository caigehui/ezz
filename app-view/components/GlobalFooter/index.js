import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { Icon } from 'antd';

function GlobalFooter({ className, links, copyright}) {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <div className={clsString}>
      {
        links && (
          <div className={styles.links}>
            {links.map(link => (
              <a
                key={link.title}
                target={link.blankTarget ? '_blank' : '_self'}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )
      }
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </div>
  );
};

const links = [{
  title: '帮助',
  href: '',
}, {
  title: '隐私',
  href: '',
}, {
  title: '条款',
  href: '',
}];


const copyright = <div>Copyright <Icon type="copyright" /> 2000-2017 WxSoft ZhuHai Inc. All Rights Reserved</div>;


GlobalFooter.defaultProps = {
  links,
  copyright
}

export default GlobalFooter

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220912084757 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE todo ADD task VARCHAR(20) NOT NULL, DROP name');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5A0EB6A0527EDB25 ON todo (task)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_5A0EB6A0527EDB25 ON todo');
        $this->addSql('ALTER TABLE todo ADD name VARCHAR(255) NOT NULL, DROP task');
    }
}

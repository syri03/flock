-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 mai 2024 à 02:46
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `my_project`
--

-- --------------------------------------------------------

--
-- Structure de la table `compte`
--

CREATE TABLE `compte` (
  `id_compte` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `privilege` enum('A','U') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `compte`
--

INSERT INTO `compte` (`id_compte`, `email`, `mdp`, `privilege`) VALUES
(1, 'ACHREFCHERNI@gmail.com', 'achref', 'U'),
(57, 'majdomri25@gmail.com', 'majd25', 'U'),
(59, 'yassine@gmail.com', 'yassine', ''),
(63, 'riadh.ben.smida.123@gmail.com', 'RIADH', 'U'),
(73, 'youssef@gmail.com', 'youssef', 'U'),
(75, 'youssef@gmail.com', 'youssef', 'U'),
(94, 'israaomri@gmail.com', 'israa', '');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `type_event` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `titre_event` varchar(255) NOT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `creator` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`type_event`, `note`, `titre_event`, `start`, `end`, `location`, `description`, `creator`, `image`) VALUES
('israa', 'israa', 'israa', '2024-05-01 21:53:00', '2024-05-01 21:53:00', 'israa', 'israa', 'israa', 'C:\\fakepath\\pexels-vishnu-r-nair-1105666.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

CREATE TABLE `profile` (
  `id_prof` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `descr` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `profile`
--

INSERT INTO `profile` (`id_prof`, `username`, `descr`, `image`, `job`, `country`, `phone`, `email`, `twitter`, `facebook`, `instagram`) VALUES
(48, 'aa', 'aa', NULL, 'aa', 'aa', 'aa', NULL, 'aa', 'aa', 'aa'),
(49, 'zz', 'zz', NULL, 'zz', 'zz', 'z', NULL, 'z', 'z', 'z'),
(50, 'dfssdf', 'sdfdfs', NULL, 'sdfsdf', 'fsd', 'dfs', NULL, 'dfs', 'dfs', 'sfd'),
(51, 'qsd', 'qsd', NULL, 'qsd', 'qsd', 'sqd', NULL, 'sdq', 'qsd', 'qsd'),
(52, 'hgf', 'hdfg', NULL, 'hdfg', 'hdfg', 'hdfg', NULL, 'hfgd', 'hdfg', 'hgdf'),
(53, 'bv', 'vb', NULL, 'vb', 'vb', 'vb', NULL, 'vb', 'vb', 'vb'),
(54, 'op', 'op', NULL, 'op', 'op', 'op', 'israaomri@gmail.com', 'op', 'op', 'op');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `num_tel` varchar(20) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `id_compte` int(11) DEFAULT NULL,
  `username` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_user`, `nom`, `prenom`, `num_tel`, `ville`, `id_compte`, `username`) VALUES
(3, 'achref', 'cherni', '99999999', 'zahra', 1, 'mumbo'),
(4, 'riadh', 'ben smida', '99999999', 'zahra', 63, 'riri'),
(5, 'majd', 'omri', '87878787', 'gasrine', 57, 'majdomri25'),
(6, 'youssef', 'ayachi', '00000000', 'riadh', 73, 'youbix'),
(7, 'youssef', 'ayachi', '00000000', 'riadh', 75, 'youbix'),
(8, 'yassine', 'mabaouj', '94234637', 'zahra', 59, 'syno'),
(9, 'israa', 'omri', '77777777', 'riadh', 94, 'op');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id_compte`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`titre_event`);

--
-- Index pour la table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id_prof`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `fk_id_compte` (`id_compte`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `profile`
--
ALTER TABLE `profile`
  MODIFY `id_prof` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_id_compte` FOREIGN KEY (`id_compte`) REFERENCES `compte` (`id_compte`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
